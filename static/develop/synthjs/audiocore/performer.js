goog.provide("synthjs.audiocore.Performer");

goog.require("synthjs.audiocore.Generator");
goog.require("synthjs.audiocore.DynamicGenerator");
goog.require("synthjs.audiocore.PerformerBase");
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
	
	goog.base(this);	
	// /** @private */
	// this._track = null;
	
	// this._tempo = null;
	// this._deltaPerSample = null;
	// this.setTempo(500000); // 500,000 means 120bpm
	
	/** @private */
	this._dynamicGenerator = null;//new synthjs.audiocore.DynamicGenerator(track.getWave());
	
	this._filters = [];
	// /**
	//  * @private
	//  */
	// this._currentEventIndex = 0;
	
	// this._currentSampleIndex = 0;
	// this._currentOffset = 0; // Units of delta.
	// /**
	//  * @private
	//  */
	// this._eof = false;
	
};
goog.inherits(synthjs.audiocore.Performer, synthjs.audiocore.PerformerBase);

/**
 * Sets wave
 * @param {synthjs.audiocore.WavePlugin} wave
 */
synthjs.audiocore.Performer.prototype.setWave = function(wave){
	this._dynamicGenerator = new synthjs.audiocore.DynamicGenerator(wave);
};


/**
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

	// When event does not exist in required buffer, do nothing.
	this._currentSeq = new synthjs.audiocore.DynamicGeneratorSequence();
	this.getBufferDeferredInternal(len);
	
	if( this._track.getEvent(this._currentEventIndex)===false ){
		// 再生終了
		this._eof = true;
	}

	return this._dynamicGenerator.querySequenceDeferred(this._currentSeq);
};

// synthjs.audiocore.Performer.prototype._getBufferDeferred = function(len){
// 	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
// 	goog.asserts.assert(this._track, "Track was empty.");
// 	goog.asserts.assertNumber(this._deltaPerSample);
// 	if( this._track.getEvent(this._currentEventIndex)===false ){
// 		this._eof = true;
		
// 		return new D().addCallback(function(){
// 			return {leftBuffer: new Float32Array(len), rightBuffer: new Float32Array(len)};
// 		});
// 	}

// 	// When event does not exist in required buffer, do nothing.
// 	var nextEvent = this._track.getEvent(this._currentEventIndex);
// 	// if( nextEvent!==false &&
// 	// 	nextEvent.get("offset") > len*this._deltaPerSample + this._currentOffset )
// 	// {
// 	// 	this._currentOffset += len * this._deltaPerSample;
// 	// 	return this._dynamicGenerator.getBufferDeferred(len);
// 	// }

// 	var to = this._currentOffset + len * this._deltaPerSample;
// 	var buflen, filled=0, d, eventOffset;
// 	var self = this;
// 	var dList = [];
// 	var seq = new synthjs.audiocore.DynamicGeneratorSequence();
// 	for(;;){

// 		if( nextEvent===false || nextEvent.get("offset") > to ){
// 			seq.pushGetBuffer(len-filled);
// 			this._currentOffset = to;
// 			break;
// 		}
		
// 		buflen = Math.floor(( nextEvent.get("offset") - this._currentOffset) / this._deltaPerSample );

// 		if( buflen > 0 ){
// 			seq.pushGetBuffer(buflen);
// 			this._currentOffset = nextEvent.get("offset");
// 		}


// 		eventOffset = nextEvent.get("offset");
// 		for(;;){
// 			nextEvent = this._track.getEvent(this._currentEventIndex);

// 			if( !nextEvent ){
// 				break;
// 			}
// 			else if( nextEvent instanceof synthjs.model.MidiKeyEvent ){
// 				if( nextEvent.get("offset")==eventOffset ){
// 					switch(nextEvent.get("type")){
// 						case synthjs.model.MidiKeyEventType.ON:
// 							// d.assocChainDeferred(self._dynamicGenerator.addNoteDeferred(nextEvent.get("note"), nextEvent.get("velocity")));
// 							seq.pushNoteOn(nextEvent.get("note"), nextEvent.get("velocity"));
// 							break;
// 						case synthjs.model.MidiKeyEventType.OFF:
// 							// d.assocChainDeferred(self._dynamicGenerator.removeNoteDeferred(nextEvent.get("note"), nextEvent.get("velocity")));
// 							seq.pushNoteOff(nextEvent.get("note"), nextEvent.get("velocity"));
// 							break;
// 					}
// 				}
// 				// else if( nextEvent.get("offset")!=eventOffset ) {
// 				// 	break;
// 				// }
// 			}


// 			if( nextEvent.get("offset")!=eventOffset ){
// 				break;
// 			}

// 			this._currentEventIndex++;
// 		}

		
// 		filled += buflen;
// 	}
	
// 	if( nextEvent===false ){
// 		// 再生終了
// 		this._eof = true;
// 	}

// 	return self._dynamicGenerator.querySequenceDeferred(seq);
// };

/**
 * @param {number}
 */
synthjs.audiocore.Performer.prototype.setSampleRate = function(sampleRate){
	goog.base(this, "setSampleRate", sampleRate);
	this._dynamicGenerator.setSampleRate(sampleRate);

	for( var i=0; i<this._filters.length; i++){
		rt = this._filters[i].setSampleRate(sampleRate);
	}
};


synthjs.audiocore.Performer.prototype.onEventInternal = function(event){
	if( event instanceof synthjs.model.MidiKeyEvent ){
		switch(event.get("type")){
			case synthjs.model.MidiKeyEventType.ON:
				this._currentSeq.pushNoteOn(event.get("note"), event.get("velocity"));
				break;
			case synthjs.model.MidiKeyEventType.OFF:
				this._currentSeq.pushNoteOff(event.get("note"), event.get("velocity"));
				break;
		}
	}
};

synthjs.audiocore.Performer.prototype.onGetBufferInternal = function(len){
	this._currentSeq.pushGetBuffer(len);
};