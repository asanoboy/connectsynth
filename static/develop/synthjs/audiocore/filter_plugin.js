goog.require("synthjs.utility.WorkerDeferred");

goog.provide("synthjs.audiocore.FilterPlugin");

var D = synthjs.utility.Deferred;

/** 
 * @constructor
 * @param {number} this is second unit.
 * @param {function<Float32Array, Float32Array, number>} 
 */
//synthjs.audiocore.FilterPlugin = function(length, fn){
synthjs.audiocore.FilterPlugin = function(url){
	
	/**
	 * @private
	 */
	this._url = url;
	
	/**
	 * @private
	 */
	this._worker = new Worker(url);
	
	this._worker.addEventListener("error", function(e){
		// console.log('error');
		// console.log(e);
		throw new Error("Filter Plugin has clashed.");
	});
};

/**
 * @return {number}
 */
// synthjs.audiocore.FilterPlugin.prototype.getLength = function(){
	// return this._length;
// };

/**
 * @param {number}
 */
synthjs.audiocore.FilterPlugin.prototype.setSampleRate = function(sampleRate){
	
	/**
	 * @private
	 */
	this._sampleRate = sampleRate;
	return true;
}
synthjs.audiocore.FilterPlugin.prototype.getFilterDeferred = function(){
	
	return new synthjs.utility.WorkerDeferred(this._worker, function(e){
		return e;
	});
};