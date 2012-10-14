goog.provide("synthjs.synthlib.Composer");

goog.require("synthjs.audiocore.Generator");
goog.require("synthjs.synthlib.Performer");

/**
 * @constructor 
 * @implements synthjs.audiocore.Generator
 */
synthjs.synthlib.Composer = function(opt_param){
	
	if( opt_param && opt_param.bpm ){
		this._bpm = opt_param.bpm;
	}
	else {
		this._bpm = 120;
	}
	
	/**
	 * synthjs.synthlib.Performerの配列
	 * @private
	 */
	this._performers = [];
	
	/**
	 * 状態管理stop|play
	 * @private
	 */
	this._state = 'stop';
	
};

/**
 * @param {synthjs.data.Track} track
 */
synthjs.synthlib.Composer.prototype.addTrack = function(track){
	if( this._state == 'play' ) throw new Error("system error");
	var performer = new synthjs.synthlib.Performer(track, {bpm: this._bpm});
	performer.setSampleRate(this._sampleRate);
	this._performers.push(performer);
};

synthjs.synthlib.Composer.prototype.rewind = function(){
	for(var i=0; i<this._performers.length; i++){
		this._performers[i].rewind();
	}
};

/**
 * @param {number}
 * @return {Float32Array}
 */
//synthjs.synthlib.Composer.prototype.getBuffer = function(len){
//	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
//	var rt = new Float32Array(len), buf;
//	
//	var allEof = true;
//	for( var i=0; i<this._performers.length; i++){
//		if( !this._performers[i].eof() ){
//			buf = this._performers[i].getBuffer(len);
//			for( var j=0; j<len; j++){
//				rt[j] += buf[j];
//			}
//			allEof = false; 
//		}
//	}
//	
//	if( allEof ){
//		this._eof = true;
//	}
//	
//	return rt;
//};

synthjs.synthlib.Composer.prototype.getBufferDeferred = function(len){
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	
	var dList = [];
	goog.array.forEach(this._performers, function(performer){
		if( !performer.eof() ){
			dList.push(performer.getBufferDeferred(len));
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
 * @return {Float32Array}
 */
//synthjs.synthlib.Composer.prototype.getBufferAsync = function(len, setBufferCallback){
//	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
//	var rt = new Float32Array(len), buf, numThrowGetBuffer=0, numCatchGetBuffer=0;
//	var leftBufferAll = new Float32Array(len);
//	var rightBufferAll = new Float32Array(len);
//	
//	var getBufferClosure = function(performer){
//		var setBuffer = function(leftBuffer, rightBuffer){
//			for( var j=0; j<len; j++ ){
//				leftBufferAll[j] += leftBuffer[j];
//				rightBufferAll[j] += rightBuffer[j];
//			}
//			numCatchGetBuffer++;
//			
//			if( numThrowGetBuffer == numCatchGetBuffer ){
//				setBufferCallback(leftBufferAll, rightBufferAll);
//			}
//		}
//		numThrowGetBuffer++;
//		setTimeout(function(){
//			performer.getBufferAsync(len, setBuffer);
//		},0);
//		
//	}
//	
//	var allEof = true, thisComposer = this;
//	
//	for( var i=0; i<this._performers.length; i++){
//		if( !this._performers[i].eof() ){
//			getBufferClosure(this._performers[i]);
//			
//			
//			allEof = false; 
//		}
//	}
//	
//	if( allEof ){
//		this._eof = true;
//	}
//	
//	//return rt;
//};

/**
 * @param {number}
 */
synthjs.synthlib.Composer.prototype.setSampleRate = function(sampleRate){
	/** @private */
	this._sampleRate = sampleRate;
 	for( var i=0; i<this._performers.length; i++){
 		rt = this._performers[i].setSampleRate(sampleRate);
 	}	
};

/**
 * @return {boolean}
 */
synthjs.synthlib.Composer.prototype.eof = function(){
	var eof = true;
	for( var i=0; i<this._performers.length; i++){
		//console.log(this._performers[i].eof());
		eof = eof && this._performers[i].eof();
	}
	//console.log(eof);
	return eof;	
}