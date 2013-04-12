goog.provide("synthjs.audiocore.PerformerBase");
goog.require("synthjs.utility.Deferred");
goog.require("synthjs.utility.DeferredList");

var D = synthjs.utility.Deferred;
var DL = synthjs.utility.DeferredList;
synthjs.audiocore.PerformerBase = function(){

	this._track = null;
	this._tempo = null;
	this._delta = null;
	this._deltaPerSample = null;
	this.setTempo(500000); // 500,000 means 120bpm
	this._sampleRate = null;
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
synthjs.audiocore.PerformerBase.prototype.setTempo = function(tempo){
	this._tempo = tempo;
	this._updateDeltaPerSample();
};

synthjs.audiocore.PerformerBase.prototype.setDelta = function(delta){
	this._delta = delta;
	this._updateDeltaPerSample();
};

synthjs.audiocore.PerformerBase.prototype.getOffset = function(){
	return this._currentOffset;
};

synthjs.audiocore.PerformerBase.prototype._updateDeltaPerSample = function() {
	if( !this._tempo || !this._sampleRate || !this._delta) return;
	var deltaPerSec = this._delta / (this._tempo / 1000000);

	this._deltaPerSample = deltaPerSec / this._sampleRate;
};

/**
 * Sets track.
 * @param {synthjs.model.MidiTrack} track
 */
synthjs.audiocore.PerformerBase.prototype.setTrack = function(track){
	this._track = track;
};

synthjs.audiocore.PerformerBase.prototype.getBufferDeferredInternal = function(len){

	// When event exists in required buffer, do nothing.
	var nextEvent = this._track.getEvent(this._currentEventIndex);
	var to = this._currentOffset + len * this._deltaPerSample;
	var buflen, filled=0, d, eventOffset;
	var self = this;
	for(;;){

		if( nextEvent===false || nextEvent.get("offset") > to ){
			// seq.pushGetBuffer(len-filled);
			this.onGetBufferInternal(len-filled);
			this._currentOffset = to;
			break;
		}
		
		buflen = Math.floor(( nextEvent.get("offset") - this._currentOffset) / this._deltaPerSample );
		if( buflen > 0 ){
			// seq.pushGetBuffer(buflen);
			this.onGetBufferInternal(buflen);
			this._currentOffset = nextEvent.get("offset");
		}

		eventOffset = nextEvent.get("offset");
		for(;;){
			nextEvent = this._track.getEvent(this._currentEventIndex);

			if( !nextEvent ){
				break;
			}
			else if( nextEvent.get("offset")==eventOffset ) {
				this.onEventInternal(nextEvent);
			}
			else {
				break;
			}

			this._currentEventIndex++;
		}

		
		filled += buflen;
	}
	
	// return self._dynamicGenerator.querySequenceDeferred(seq);
};


/**
 * @param {number}
 */
synthjs.audiocore.PerformerBase.prototype.setSampleRate = function(sampleRate){
	/** @private */
	this._sampleRate = sampleRate;
	
	this._updateDeltaPerSample();
};


synthjs.audiocore.PerformerBase.prototype.eof = function(){
	return this._eof;
}
;

synthjs.audiocore.PerformerBase.prototype.onEventInternal = goog.abstractMethod;

synthjs.audiocore.PerformerBase.prototype.onGetBufferInternal = goog.abstractMethod;