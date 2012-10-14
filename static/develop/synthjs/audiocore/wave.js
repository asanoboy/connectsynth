goog.provide("synthjs.audiocore.Wave");
goog.require("goog.async.Deferred");
goog.require("goog.async.DeferredList");

/** @constructor */
synthjs.audiocore.Wave = function(arr, opt_tableSize){
	/** @private */
	this._tableSize = opt_tableSize ? opt_tableSize : 1024;
	
	/** @private */
	this._table = this._createTable(arr);
	
	/** 
	 * TypedArrayはgoog.object.unsafeCloneをしたときにObject型になってしまう。
	 * その場合、FireFoxだとthis._table.lengthが使えなくなるため、メンバ変数として保存しておく。
	 * @private 
	 */
	this._tableLength = this._table.length;
};

/** 
 * @private
 * @param {Array.<number>} 
 */
synthjs.audiocore.Wave.prototype._createTable = function(arr){
	var rt = new Float32Array(this._tableSize),x,floor,floorVal,ceil,ceilVal;
	for(var i=0; i<rt.length; i++){
		x = i * arr.length / this._tableSize;
		floor = Math.floor(x);
		floorVal = arr[floor];
		ceil = Math.ceil(x);
		ceilVal = arr[ceil % arr.length];
		
		rt[i] = synthjs.audiocore.Wave._getWeightMean(floor, floorVal, ceil, ceilVal, x);
	}
	return rt;
};


/** 
 * @private
 * @param {number} integer. required length of typedarray
 * @param {number} float. angular speed [radian/sample]
 */
//synthjs.audiocore.Wave.prototype.shiftBuffer = function(offsetRadian, len, omega){
//	var rt = new Float32Array(len);
//	for( var i=0; i<len; i++ ){
//		rt[i] = this._getSampleValue(offsetRadian+i*omega);
//	}
//	return rt;
//}	

/** 
 * @public
 * @param {number} integer. required length of typedarray
 * @param {number} float. angular speed [radian/sample]
 */
synthjs.audiocore.Wave.prototype.setBufferDeferred = function(offsetRadian, len, omega){
	
	var thisWave = this,
		d = new goog.async.Deferred()
	.addCallback(function(){
		var left = new Float32Array(len),
			right = new Float32Array(len);
		for( var i=0; i<len; i++ ){
			left[i] = thisWave._getSampleValue(offsetRadian+i*omega);
			right[i] = thisWave._getSampleValue(offsetRadian+i*omega);
		}
		return {leftBuffer: left, rightBuffer: right};
	});
	
	// TODO: test
//	setTimeout(function(){
//		d.callback();
//	},0);
	
	return d;
	
}

/** 
 * @private
 * @param {number} integer. required length of typedarray
 * @param {number} float. angular speed [radian/sample]
 */
//synthjs.audiocore.Wave.prototype.setBufferAsync = function(offsetRadian, len, omega, setBufferCallback){
//	
//	var left = new Float32Array(len),
//		right = new Float32Array(len);
//	for( var i=0; i<len; i++ ){
//		left[i] = this._getSampleValue(offsetRadian+i*omega);
//		right[i] = this._getSampleValue(offsetRadian+i*omega);
//	}
//	
//	setTimeout(function(){
//		setBufferCallback(left, right);
//	}, 0);
//	
//	//return rt;
//}

/** @private */
synthjs.audiocore.Wave.prototype._getSampleValue = function(radian){
	
	var radianNormal = radian / Math.PI / 2;
	radianNormal = radianNormal % 1;
	if( radianNormal < 0 ) radianNormal += 1;
	
	var floor = Math.floor(this._tableLength * radianNormal),
	ceil = Math.ceil(this._tableLength * radianNormal),
	floorVal = this._table[floor], 
	ceilVal = this._table[ceil % this._tableLength];

	var rt = synthjs.audiocore.Wave._getWeightMean(floor, floorVal, ceil, ceilVal, this._tableLength*radianNormal);

	return rt;
	 
}

/** @private */
synthjs.audiocore.Wave._getWeightMean = function(a, aVal, b, bVal, x){
	
	if( a==b ){
		return aVal;
	}
	
	return (( x-a )*bVal + ( b-x )*aVal ) / ( b - a );
}
