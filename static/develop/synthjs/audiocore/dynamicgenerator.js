goog.provide("synthjs.audiocore.DynamicGenerator");

goog.require("synthjs.audiocore.Generator");
goog.require("synthjs.audiocore.Note");
goog.require("synthjs.audiocore.Wave");
goog.require('goog.debug.Logger');
goog.require('goog.async.Deferred');
goog.require('goog.async.DeferredList');

goog.require("synthjs.utility.Deferred");
goog.require("synthjs.utility.DeferredList");
var D = synthjs.utility.Deferred;
var DL = synthjs.utility.DeferredList;
/** 
 * @constructor
 * @implements synthjs.audiocore.Generator
 */
synthjs.audiocore.DynamicGenerator = function(wave){
	
	
	/** @private */
	this._wave = wave;
	
	/** @private */
	this._playingNotes = [];
	
	/** @private */
	this._filters = [];
	
	/** @private */
	this._afterBufferLength = 0;
	
	/** @private */
	this._afterBuffer = new Float32Array(0);
}

synthjs.audiocore.DynamicGenerator.logger = goog.debug.Logger.getLogger('synthjs.audiocore.DynamicGenerator');
synthjs.audiocore.DynamicGenerator.logger.setLevel(goog.debug.Logger.Level.ALL);

/**
 * @param {synthjs.audiocore.Note|number} note
 * @param {number=} opt_velocity
 */
synthjs.audiocore.DynamicGenerator.prototype.addNoteDeferred = function(note, opt_velocity){
	if( goog.isNumber(note) ) note = new synthjs.audiocore.Note.createByMidiFormat(note);
	var velo = goog.isDef(opt_velocity) ? parseFloat(opt_velocity) : 1;
	var d = this._wave.addEventDeferred(
		new synthjs.audiocore.WaveEvent(
			synthjs.audiocore.WaveEventType.NOTEON, 
			{
				note: note, 
				velocity: 1
			})
		);
	
	return d;
}

/**
 * @param {synthjs.audiocore.Note} note
 */
synthjs.audiocore.DynamicGenerator.prototype.removeNoteDeferred = function(note){
	var d = this._wave.addEventDeferred(
		new synthjs.audiocore.WaveEvent(
			synthjs.audiocore.WaveEventType.NOTEOFF, 
			{
				note: note,
				velocity: 1
			})
		);
	
	return d;
}

synthjs.audiocore.DynamicGenerator.prototype.clearNoteDeferred = function(){
	return this._wave.addEventDeferred(
		new synthjs.audiocore.WaveEvent(
			synthjs.audiocore.WaveEventType.NOTEALLOFF, 
			{})
		);
}

/**
 * @return {boolean}
 */
synthjs.audiocore.DynamicGenerator.prototype.clearNote = function(){
	this._playingNotes = [];
	return true;
}

synthjs.audiocore.DynamicGenerator.prototype.getBufferDeferred = function(len){
	
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	
	var d = this._wave.getBufferDeferred(len);
	d.name = 'wave'; // for debug
	goog.array.forEach(this._filters, function(filter){
		var dFilter = filter.getFilterDeferred();
		dFilter.name = 'filter';
		d.assocChainDeferred(dFilter);
		//filter.getFilterDeferred(len, d);
		//d.chainDeferred();
	});
	
	return d;
}


// wavePluginに対応する前のgetBufferDeferred
// synthjs.audiocore.DynamicGenerator.prototype.__getBufferDeferred = function(len){
// 
	// if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
// 	
	// var omega, i, thisGen=this;
// 	
	// var setBufferDeferredCallback = function(buffersList){
// 	
		// var leftBufferAll = new Float32Array(len), 
			// rightBufferAll = new Float32Array(len);
		// goog.array.forEach(buffersList, function(buffers){
			// var left = buffers[1].leftBuffer,
				// right = buffers[1].rightBuffer;
			// for(var i=0; i<len; i++){
				// leftBufferAll[i] += left[i];
				// rightBufferAll[i] += right[i];
			// }
		// });
// 		
		// return {leftBuffer: leftBufferAll, rightBuffer:rightBufferAll};
// 		
	// }
// 	
	// var dList = [];
	// //console.log("this._playingNotes.length="+this._playingNotes.length);
	// for( i=0; i<this._playingNotes.length; i++){
		// omega = 2*Math.PI / this._sampleRate * this._playingNotes[i].note.getFreq() ;
		// dList.push( this._wave.setBufferDeferred(
			// this._playingNotes[i].offsetRadian,
			// len, 
			// omega
			// ));
		// this._playingNotes[i].offsetRadian += omega * len;
	// }
// 	
// //	var d = new goog.async.DeferredList(dList)
// //		.addCallback(setBufferDeferredCallback);
// 	
	// // TODO: testが必要
	// var dWait = new D();
	// var d = new D().addCallback(function(){
		// //console.log("dList.length="+dList.length);
// 		
		// if( dList.length ){
// 			
			// var dWaves = new DL(dList)
				// .addCallback(setBufferDeferredCallback)
				// .chainDeferred(dWait);
			// goog.array.forEach(dList, function(d){
				// setTimeout(function(){d.callback();}, 0);
			// });
		// }
		// else {
// 			
			// dWait.callback({
				// leftBuffer: new Float32Array(len),
				// rightBuffer : new Float32Array(len)
			// });
		// }
// 		
	// }).awaitDeferred(dWait);
// 	
// 	
	// goog.array.forEach(thisGen._filters, function(filter){
		// filter.getFilterDeferred(len, d);
		// //d.chainDeferred();
	// });
// 	
	// return d;
// };

synthjs.audiocore.DynamicGenerator.prototype.setSampleRate = function(sampleRate){
	
	/** @private */
	this._sampleRate = sampleRate;
 	
 	for( i=0; i<this._filters.length; i++){
 		rt = this._filters[i].setSampleRate(sampleRate);
 	}
}

/**
 * DynamicGenerator does not finish.
 * @param {boolean}
 */
synthjs.audiocore.DynamicGenerator.prototype.eof = function(){
	return false;
}

/**
 * @param {synthjs.audiocore.Filter}
 * @return {synthjs.audiocore.Generator}
 */
synthjs.audiocore.DynamicGenerator.prototype.addFilter = function(filter){
	filter.setSampleRate(this._sampleRate);
	this._filters.push(filter);
	return this;
}
