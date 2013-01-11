goog.provide("synthjs.audiocore.Composer");

goog.require("synthjs.audiocore.Performer");
goog.require("synthjs.audiocore.PerformerBase");
/**
 * Composes multi track with each performer.
 * @constructor
 */
synthjs.audiocore.Composer = function(){
	
	goog.base(this);
	// this._ = true;
	/**
	 * Array of synthjs.audiocore.Performer
	 * @private
	 */
	this._performers = [];
	
};
goog.inherits(synthjs.audiocore.Composer, synthjs.audiocore.PerformerBase);

/**
 * @param {synthjs.audiocore.Performer} performer
 */
synthjs.audiocore.Composer.prototype.addPerformer = function(performer){
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
	
	var self = this;
	this._dListArray = [];
	this.getBufferDeferredInternal(len);
	
	var dWait = new goog.async.Deferred();
	var d = new goog.async.Deferred().addCallback(goog.bind(function(){
		var dPerformersList = [];
		goog.array.forEach(this._dListArray, function(dList, idx){

			var dPerformers = new goog.async.DeferredList(dList).addCallback(function(buffersList){
				var eachLen = buffersList[0][1].leftBuffer.length;
				var leftBufferAll = new Float32Array(eachLen);
				var rightBufferAll = new Float32Array(eachLen);

				goog.array.forEach(buffersList, function(buffers, a){
					for(var i=0; i<eachLen; i++){
						leftBufferAll[i] += buffers[1].leftBuffer[i];
						rightBufferAll[i] += buffers[1].rightBuffer[i];
					}
				});
				return {leftBuffer: leftBufferAll, rightBuffer: rightBufferAll};
			});
				
			dPerformersList.push(dPerformers);
		}, this);

		var dAll = new goog.async.DeferredList(dPerformersList).addCallback(function(buffersList){
			var leftBuffer, rightBuffer;
			var result = {
				leftBuffer: (leftBuffer=new Float32Array(len)),
				rightBuffer: (rightBuffer=new Float32Array(len))};
			var i = 0;
			goog.array.forEach(buffersList, function(buffers){
				for( var j=0; j<buffers[1].leftBuffer.length; j++ ){
					result.leftBuffer[i] = buffers[1].leftBuffer[j];
					result.rightBuffer[i] = buffers[1].rightBuffer[j];
					i++;
				}
			}, this);
			return result;
		}).chainDeferred(dWait);

		goog.array.forEach(this._dListArray, function(dList){
			goog.array.forEach(dList, function(d){
				d.callback();
			});
		});

	}, this)).awaitDeferred(dWait);
	
	return d;
};

synthjs.audiocore.Composer.prototype._getBufferDeferred = function(len){
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
		});
		
	}).awaitDeferred(dWait);
	
	return d;
};

/**
 * @param {number}
 */
synthjs.audiocore.Composer.prototype.setSampleRate = function(sampleRate){

	goog.base(this, "setSampleRate", sampleRate);
	for( var i=0; i<this._performers.length; i++){
		rt = this._performers[i].setSampleRate(sampleRate);
	}
};

synthjs.audiocore.Composer.prototype.setTempo = function(tempo){
	goog.base(this, "setTempo", tempo);
	if( this._performsers ){

		for( var i=0; i<this._performers.length; i++ ){
			this._performers[i].setTempo(tempo);
		}
	}
};
/**
 * @return {boolean}
 */
synthjs.audiocore.Composer.prototype.eof = function(){
	var eof = true;
	for( var i=0; i<this._performers.length; i++){
		eof = eof && this._performers[i].eof();
	}
	return eof;
};

synthjs.audiocore.Composer.prototype.onEventInternal = function(event){
	if( event.isTempo() ){
		var data = event.get("data");
		var tempo = (((data[2]<<8)+data[3])<<8)+data[4];
		this.setTempo( tempo );
	}
};

synthjs.audiocore.Composer.prototype.onGetBufferInternal = function(len){
	if( !len) console.trace();
	var dList = [];
	goog.array.forEach(this._performers, function(p){
		if( !p.eof() ){
			dList.push(p.getBufferDeferred(len));
		}
	});
	this._dListArray.push(dList);
};