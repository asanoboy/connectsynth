goog.provide("synthjs.audiocore.Filter");

/** 
 * @constructor
 * @param {number} this is second unit.
 * @param {function<Float32Array, Float32Array, number>} 
 */
synthjs.audiocore.Filter = function(length, fn){
	/** 
	 * filter用にストックしておく秒数
	 * @private
	 */
	this._length = length;
	
	/** @private */
	this._filterFunc = fn;
	
	/** @private */
	this._buffer = new Float32Array(0);
	
	/** @private */
	this._bufferLeft = null;//new Float32Array(0);
	
	/** @private */
	this._bufferRight = null;//new Float32Array(0);
};

/**
 * @return {number}
 */
synthjs.audiocore.Filter.prototype.getLength = function(){
	return this._length;
};

/**
 * @param {number}
 */
synthjs.audiocore.Filter.prototype.setSampleRate = function(sampleRate){
	this._sampleRate = sampleRate;
	if( sampleRate ){
		this._bufferLeft = new Float32Array(this._length * this._sampleRate);
		this._bufferRight = new Float32Array(this._length * this._sampleRate);
	}
	return true;
}


synthjs.audiocore.Filter.prototype.getFilterDeferred = function(inputLen){
	var d = new goog.async.Deferred();
	
	var stockLen = this._length * this._sampleRate; // フィルター用に保存してある出力済みのバッファの配列長さ
	var filteredLength = 0;
	var thisFilter = this;
	var callback = null;
	var filteringLength;
	var filteredLeftTotal = new Float32Array(inputLen);
	var filteredRightTotal = new Float32Array(inputLen);
	
	var getCallbackFunction = function(length, offset){
		return function(buffers){
			var leftBuffer = buffers.leftBuffer,
				rightBuffer = buffers.rightBuffer;
				
			// フィルターする
			var filteredLeft = thisFilter._filterFunc(
				thisFilter._bufferLeft.subarray(stockLen-length, stockLen), leftBuffer.subarray(offset, offset+length));
			var filteredRight = thisFilter._filterFunc(
				thisFilter._bufferRight.subarray(stockLen-length, stockLen), rightBuffer.subarray(offset, offset+length));
			for(var i=0; i<length; i++){
				leftBuffer[offset+i] = filteredLeft[i];
				rightBuffer[offset+i] = filteredRight[i];
			}
			
			// _bufferLeftなどを更新
			var oldBufferLeft = new Float32Array(thisFilter._bufferLeft);
		 	var oldBufferRight = new Float32Array(thisFilter._bufferRight);
			
			for(var i=0; i<stockLen; i++){
				if( i < stockLen - length ){
					thisFilter._bufferLeft[i] = oldBufferLeft[length+i];
					thisFilter._bufferRight[i] = oldBufferRight[length+i];
				}
				else {
					thisFilter._bufferLeft[i] = leftBuffer[i - (stockLen - length)];
					thisFilter._bufferRight[i] = rightBuffer[i - (stockLen - length)];
				}
			}
			
			return {leftBuffer: leftBuffer, rightBuffer:rightBuffer};
		}
	}
	
	while(1){
		filteringLength = inputLen-filteredLength > stockLen ? stockLen : inputLen-filteredLength;
		if( filteringLength<=0 ) break;
		callback = getCallbackFunction(filteringLength, filteredLength);
		d.addCallback(callback);
		filteredLength += filteringLength;
	}
	
	return d;
};

/**
 * inputLeft.length == inputRight.lengthでないとバグる
 * @param {Float32Array} 
 * @param {Float32Array}
 */
synthjs.audiocore.Filter.prototype.doFilterAsync = function(inputLeft, inputRight, setBufferCallback){
	if( !this._sampleRate ) throw new Error('sampleRate was not set.');
	
	var inputLen = inputLeft.length;
	var stockLen = this._length * this._sampleRate; // フィルター用に保存してある出力済みのバッファの配列長さ
	var filteredLength = 0;
	var thisFilter = this;
	var filteredLeftTotal = new Float32Array(inputLen);
	var filteredRightTotal = new Float32Array(inputLen);
	
	// フィルターする長さ。stockLenよりも大きくならないようにする。
	var filteringLength = inputLen-filteredLength > stockLen ? stockLen : inputLen-filteredLength;

	var setBuffer = function(leftBuffer, rightBuffer){

		for(var i=0; i<leftBuffer.length; i++){
			filteredLeftTotal[filteredLength+i] = leftBuffer[i];
			filteredRightTotal[filteredLength+i] = rightBuffer[i];
		}
		
	 	/*
	 	 * filter用に出力された配列のうち、stockLen分はthis._bufferにおいておく。
	 	 */
	 	var oldBufferLeft = new Float32Array(thisFilter._bufferLeft);
	 	var oldBufferRight = new Float32Array(thisFilter._bufferRight);
		
		
		for(var i=0; i<stockLen; i++){
			if( i < stockLen - filteringLength ){
				thisFilter._bufferLeft[i] = oldBufferLeft[filteringLength+i];
				thisFilter._bufferRight[i] = oldBufferRight[filteringLength+i];
			}
			else {
				thisFilter._bufferLeft[i] = leftBuffer[i - (stockLen - filteringLength)];
				thisFilter._bufferRight[i] = rightBuffer[i - (stockLen - filteringLength)];
			}
		}
		delete oldBufferLeft;
		delete oldBufferRight;
		
		filteredLength += filteringLength;
		filteringLength = inputLen-filteredLength > stockLen ? stockLen : inputLen-filteredLength;
		if( filteredLength == inputLen ){
			setBufferCallback(filteredLeftTotal, filteredRightTotal);
		}
					
		
	}
	
	var executeFilter = function(){
		
		var delayedLeft = new Float32Array(filteringLength);
		var delayedRight = new Float32Array(filteringLength);
		var inputLeftChank = inputLeft.subarray(filteredLength, filteredLength+filteringLength);
		var inputRightChank = inputRight.subarray(filteredLength, filteredLength+filteringLength);
		
		for(var i=0; i<filteringLength; i++){
			if( i<stockLen ){
				delayedLeft[i] = thisFilter._bufferLeft[i];
				delayedRight[i] = thisFilter._bufferRight[i];
			}
			else {
				delayedLeft[i] = inputLeftChank[i-stockLen];
				delayedRight[i] = inputRightChank[i-stockLen];
			}	
		}
		var filteredLeft = thisFilter._filterFunc(delayedLeft, inputLeft);
		var filteredRight = thisFilter._filterFunc(delayedRight, inputRight);
		
		setBuffer(filteredLeft, filteredRight);
	}
	
 	executeFilter();
}

/**
 * @param {Float32Array}
 */
synthjs.audiocore.Filter.prototype.doFilter = function(input){

	if( this._buffer ){
		var delayed = new Float32Array(input.length);
		for(var i=0; i<delayed.length; i++){
			if( i<this._buffer.length ){
				delayed[i] = this._buffer[i];
			}
			else {
				delayed[i] = input[i-this._buffer.length];
			}	
		}
		
		var filtered = this._filterFunc(delayed, input);
	}
	else {
		var filtered = input;
	}
		
 	/*
 	 * filter用に出力された配列のうち、stockLen分はthis._bufferにおいておく。
 	 */
 	var stockLen = this._length * this._sampleRate;
 	if( stockLen > 0 ){
 		if( stockLen < filtered.length ){
console.log("stockLen < filtered.length"); 			
 			this._buffer = filtered.subarray(filtered.length-stockLen, stockLen);
 		}
 		else if( stockLen < filtered.length + this._buffer.length ){
console.log("stockLen < filtered.length + this._buffer.length"); 			
 			var oldOffset = this._buffer.length + filtered.length - stockLen,
 			oldBuffer = this._buffer;
 			
 			this._buffer = new Float32Array(stockLen);
 			for(i=0; i<stockLen; i++){
 				this._buffer[i] = 0;
 			}
 			var key, startOffset = oldBuffer.length + filtered.length - stockLen;
 			for( i=0; i<stockLen; i++ ){
 				if( i < oldBuffer.length - startOffset ){
 					this._buffer[i] = oldBuffer[startOffset + i];
 				}
 				else {
 					this._buffer[i] = filtered[startOffset + i - oldBuffer.length];
 				}
 			}
 		}
 		else {
console.log("else");
 			var oldBuffer = this._buffer,
 			zeroOffset = stockLen - oldBuffer.length - filtered.length;
 			this._buffer = new Float32Array(stockLen);
 			for( i=0; i<oldBuffer.length + filtered.length; i++ ){
 				if( i < oldBuffer.length ){
 					this._buffer[zeroOffset + i] = oldBuffer[i];
 				}
 				else{
 					this._buffer[zeroOffset + i] = filtered[i - oldBuffer.length];
 				}  
 			}
 		}
 	}

	 	
 	return filtered;
}
