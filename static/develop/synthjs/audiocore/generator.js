goog.provide("synthjs.audiocore.Generator");

goog.require("synthjs.audiocore.Filter");
goog.require("synthjs.audiocore.FilterPlugin");
/**
 * @interface
 * @param {synthjs.audiocore.Wave}
 */
synthjs.audiocore.Generator = function(wave){}

/**
 * @param {number}
 * @return {Float32Array}
 */
synthjs.audiocore.Generator.prototype.getBuffer = function(len){}

/**
 * @param {number}
 * @param {function}
 */
synthjs.audiocore.Generator.prototype.getBufferAsync = function(len, callback){}

/**
 * @param {number}
 */
synthjs.audiocore.Generator.prototype.setSampleRate = function(sampleRate){}


/**
 * @return {boolean}
 */
synthjs.audiocore.Generator.prototype.eof = function(){}



