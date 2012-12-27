goog.provide("synthjs.audiocore.Performer");

goog.require("synthjs.audiocore.Generator");
goog.require("synthjs.audiocore.DynamicGenerator");
//goog.require("synthjs.data.Track");

goog.require("synthjs.utility.Deferred");
goog.require("synthjs.utility.DeferredList");

var D = synthjs.utility.Deferred;
var DL = synthjs.utility.DeferredList;

/**
 * synthjs.model.MidiTrackを読み込んで音を出す。
 * Trackの内容が変更されたら、動的に対応できるようにする。
 * trackにはScoreとWaveが設定されていないとエラーの可能性あり
 * @constructor
 * @param {synthjs.model.MidiTrack} track
 * @param {null|object} opt_param
 * @implements synthjs.audiocore.Generator
 */
synthjs.audiocore.Performer = function(){
	
	
	/** @private */
	this._track = null;
	
	this._tempo = null;
	this._deltaPerSample = null;
	this.setTempo(500000); // 500,000 means 120bpm
	
	/** @private */
	this._dynamicGenerator = null;//new synthjs.audiocore.DynamicGenerator(track.getWave());
	
	this._filters = [];
	/**
	 * @private
	 */
	this._currentEventIndex = 0;
	
	this._currentSampleIndex = 0;
	this._currentOffset = 0; // Units of delta.
	/**
	 * @private
	 */
	this._eof = false;
	
};

/**
 * Sets tempo in MIDI "FF 51 03" event format.
 * @param {number} tempo
 */
synthjs.audiocore.Performer.prototype.setTempo = function(tempo){
	this._tempo = tempo;
	this._updateDeltaPerSample();
};

synthjs.audiocore.Performer.prototype.setDelta = function(delta){
	this._delta = delta;
	this._updateDeltaPerSample();
};
/**
 * Sets wave
 * @param {synthjs.audiocore.WavePlugin} wave
 */
synthjs.audiocore.Performer.prototype.setWave = function(wave){
	this._dynamicGenerator = new synthjs.audiocore.DynamicGenerator(wave);
};

synthjs.audiocore.Performer.prototype._updateDeltaPerSample = function() {
	if( !this._tempo || !this._sampleRate || !this._delta) return;
	var deltaPerSec = this._delta / (this._tempo / 1000000);
	this._deltaPerSample = deltaPerSec / this._sampleRate;
};

/**
 * はじめに巻き戻す
 * @param {number} opt_offset 巻き戻す位置。beat単位
 */
synthjs.audiocore.Performer.prototype.rewind = function(){
	
	// 古いdynamicGeneratorは捨てる
	//this._dynamicGenerator = new synthjs.audiocore.DynamicGenerator(this._track.getWave(true));
	//this._dynamicGenerator.setSampleRate(this._sampleRate);
	this._currentEventIndex = 0;
	this._currentSampleIndex = 0;
	this._currentOffset = 0;
	this._eof = false;
	
};

/**
 * Sets track.
 * @param {synthjs.model.MidiTrack} track
 */
synthjs.audiocore.Performer.prototype.setTrack = function(track){
	this._track = track;
};

synthjs.audiocore.Performer.prototype.getBufferDeferred = function(len){
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	goog.asserts.assert(this._track, "Track was empty.");
	goog.asserts.assertNumber(this._deltaPerSample);
	if( this._track.getEvent(this._currentEventIndex)===false ){
		this._eof = true;
		
		return new D().addCallback(function(){
			return {leftBuffer: new Float32Array(len), rightBuffer: new Float32Array(len)};
		});
	}

	// When event exists in required buffer, do nothing.
	var nextEvent = this._track.getEvent(this._currentEventIndex);
	var to = this._currentOffset + len * this._deltaPerSample;
	if( nextEvent!==false &&
		nextEvent.get("offset") > len*this._deltaPerSample + this._currentOffset )
	{
		this._currentOffset += len * this._deltaPerSample;
		return this._dynamicGenerator.getBufferDeferred(len);
	}

	var buflen, filled=0, d, eventOffset;
	var self = this;
	var dList = [];
	for(;;){

		if( nextEvent===false || nextEvent.get("offset") > to ){
			dList.push(this._dynamicGenerator.getBufferDeferred(len-filled));
			this._currentOffset = to;
			break;
		}
		
		buflen = Math.floor(( nextEvent.get("offset") - this._currentOffset) / this._deltaPerSample );

		if( buflen > 0 ){
			d = this._dynamicGenerator.getBufferDeferred(buflen);
			this._currentOffset = nextEvent.get("offset");
		}
		else{
			d = (new D()).addCallback(function(){
				return {leftBuffer: new Float32Array(0), rightBuffer: new Float32Array(0)};
			});
		}


		eventOffset = nextEvent.get("offset");
		for(;;){
			nextEvent = this._track.getEvent(this._currentEventIndex);

			if( !nextEvent ){
				break;
			}
			else if( nextEvent instanceof synthjs.model.MidiKeyEvent ){
				if( nextEvent.get("offset")==eventOffset ){
					switch(nextEvent.get("type")){
						case synthjs.model.MidiKeyEventType.ON:
							d.assocChainDeferred(self._dynamicGenerator.addNoteDeferred(nextEvent.get("note"), nextEvent.get("verocity")));
							break;
						case synthjs.model.MidiKeyEventType.OFF:
							d.assocChainDeferred(self._dynamicGenerator.removeNoteDeferred(nextEvent.get("note"), nextEvent.get("verocity")));
							break;
					}
				}
				else if( nextEvent.get("offset")!=eventOffset ) {
					break;
				}
			}


			if( nextEvent.get("offset")!=eventOffset ){
				break;
			}

			this._currentEventIndex++;
		}

		
		filled += buflen;
		dList.push(d);
	}
	
	if( nextEvent===false ){
		// 再生終了
		this._eof = true;
	}

	var dStart = new D(),
		dWait = new D();
	var bufferFilled = 0;
		leftBufferAll = new Float32Array(len),
		rightBufferAll = new Float32Array(len);

	goog.array.forEach(dList, function(d, idx){
		dStart.assocChainDeferred(d.addCallback(
			function(buffers){
				if( buffers && buffers.leftBuffer && buffers.rightBuffer ){

					var left = buffers.leftBuffer;
					var right = buffers.rightBuffer;
					for( var i=0; i<left.length; i++){
						leftBufferAll[bufferFilled + i] = left[i];
						rightBufferAll[bufferFilled + i] = right[i];
						bufferFilled++;
					}
				}
			}
		));
		if( idx==dList.length-1 ){
			dStart.addCallback(function(){
				dWait.callback({leftBuffer: leftBufferAll, rightBuffer: rightBufferAll});
			});
		}
	});
	return dStart.awaitDeferred(dWait);
};

/**
 * @param {number}
 */
synthjs.audiocore.Performer.prototype.setSampleRate = function(sampleRate){
	/** @private */
	this._sampleRate = sampleRate;
	this._dynamicGenerator.setSampleRate(sampleRate);
	
	this._updateDeltaPerSample();
	for( var i=0; i<this._filters.length; i++){
		rt = this._filters[i].setSampleRate(sampleRate);
	}
};


synthjs.audiocore.Performer.prototype.eof = function(){
	return this._eof;
}
;