goog.provide("synthjs.audiocore.Composer");

goog.require("synthjs.audiocore.Performer");
/**
 * Composes multi track with each performer.
 * @constructor
 */
synthjs.audiocore.Composer = function(){
	
	/**
	 * Array of synthjs.audiocore.Performer
	 * @private
	 */
	this._performers = [];
	
};

/**
 * @param {synthjs.data.Track} track
 */
synthjs.audiocore.Composer.prototype.addTrack = function(track){
	var performer = new synthjs.audiocore.Performer(track, {bpm: this._bpm});
	performer.setSampleRate(this._sampleRate);
	this._performers.push(performer);
};

synthjs.audiocore.Composer.prototype.rewind = function(){
	goog.array.forEach(this._performers, function(p){
		p.rewind();
	});
};

synthjs.audiocore.Composer.prototype.getBufferDeferred = function(len){
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	
	var dList = [];
	goog.array.forEach(this._performers, function(p){
		if( !p.eof() ){
			dList.push(p.getBufferDeferred(len));
		}
	});
	
	var dWait = new goog.async.Deferred();
	var d = new goog.async.Deferred().addCallback(function(){
		var dPerformers = new goog.async.DeferredList(dList).addCallback(function(buffersList){
			var leftBufferAll = new Float32Array(len);
			var rightBufferAll = new Float32Array(len);
			goog.array.forEach(buffersList, function(buffers, a){
				for(var i=0; i<len; i++){
					leftBufferAll[i] += buffers[1].leftBuffer[i];
					rightBufferAll[i] += buffers[1].rightBuffer[i];
				}
			});
			
			return {leftBuffer: leftBufferAll, rightBuffer: rightBufferAll};
		}).chainDeferred(dWait);
		
		goog.array.forEach(dList, function(d){
			d.callback();
		})
		
	}).awaitDeferred(dWait);
	
	return d;
}

/**
 * @param {number}
 */
synthjs.audiocore.Composer.prototype.setSampleRate = function(sampleRate){
	/** @private */
	this._sampleRate = sampleRate;
 	for( var i=0; i<this._performers.length; i++){
 		rt = this._performers[i].setSampleRate(sampleRate);
 	}	
};

/**
 * @return {boolean}
 */
synthjs.audiocore.Composer.prototype.eof = function(){
	var eof = true;
	for( var i=0; i<this._performers.length; i++){
		//console.log(this._performers[i].eof());
		eof = eof && this._performers[i].eof();
	}
	//console.log(eof);
	return eof;	
}