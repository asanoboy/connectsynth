goog.provide("synthjs.audiocore.DynamicGenerator");

goog.require("synthjs.audiocore.Generator");
goog.require("synthjs.audiocore.Note");
// goog.require("synthjs.audiocore.Wave");
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
};

synthjs.audiocore.DynamicGenerator.logger = goog.debug.Logger.getLogger('synthjs.audiocore.DynamicGenerator');
synthjs.audiocore.DynamicGenerator.logger.setLevel(goog.debug.Logger.Level.ALL);

/**
 * @param {synthjs.audiocore.Note|number} note
 * @param {number=} opt_velocity in range [0, 127]
 */
synthjs.audiocore.DynamicGenerator.prototype.addNoteDeferred = function(note, opt_velocity){
	if( goog.isNumber(note) ) note = new synthjs.audiocore.Note.createByMidiFormat(note);
	var velo = goog.isDef(opt_velocity) ? parseFloat(opt_velocity)/128 : 1;
	var d = this._wave.addEventDeferred(
		new synthjs.audiocore.WaveEvent(
			synthjs.audiocore.WaveEventType.NOTEON,
			{
				note: note,
				velocity: velo
			})
		);
	
	return d;
};

/**
 * @param {synthjs.audiocore.Note} note
 */
synthjs.audiocore.DynamicGenerator.prototype.removeNoteDeferred = function(note, opt_velocity){
	var velo = goog.isDef(opt_velocity) ? parseFloat(opt_velocity)/128 : 1;
	var d = this._wave.addEventDeferred(
		new synthjs.audiocore.WaveEvent(
			synthjs.audiocore.WaveEventType.NOTEOFF,
			{
				note: note,
				velocity: velo
			})
		);
	
	return d;
};

synthjs.audiocore.DynamicGenerator.prototype.clearNoteDeferred = function(){
	return this._wave.addEventDeferred(
		new synthjs.audiocore.WaveEvent(
			synthjs.audiocore.WaveEventType.NOTEALLOFF,
			{})
		);
};

/**
 * @return {boolean}
 */
synthjs.audiocore.DynamicGenerator.prototype.clearNote = function(){
	this._playingNotes = [];
	return true;
};

synthjs.audiocore.DynamicGenerator.prototype.getBufferDeferred = function(len){
	
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	
	var d = this._wave.getBufferDeferred(len);
	goog.array.forEach(this._filters, function(filter){
		var dFilter = filter.getFilterDeferred();
		dFilter.name = 'filter';
		d.assocChainDeferred(dFilter);
		//filter.getFilterDeferred(len, d);
		//d.chainDeferred();
	});
	
	return d;
};

/**
 * Queries many request at once.
 * @param  {synthjs.audiocore.DynamicGeneratorSequence} seq
 * @return {synthjs.utility.Deferred}
 */
synthjs.audiocore.DynamicGenerator.prototype.querySequenceDeferred = function(seq){
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	
	var d = this._wave.getBufferSequenciallyDeferred(seq.getSequence());
	goog.array.forEach(this._filters, function(filter){
		var dFilter = filter.getFilterDeferred();
		dFilter.name = 'filter';
		d.assocChainDeferred(dFilter);
		//filter.getFilterDeferred(len, d);
		//d.chainDeferred();
	});
	
	return d;
};

synthjs.audiocore.DynamicGenerator.prototype.setSampleRate = function(sampleRate){
	
	/** @private */
	this._sampleRate = sampleRate;

	for( i=0; i<this._filters.length; i++){
		rt = this._filters[i].setSampleRate(sampleRate);
	}
};

/**
 * DynamicGenerator does not finish.
 * @param {boolean}
 */
synthjs.audiocore.DynamicGenerator.prototype.eof = function(){
	return false;
};

/**
 * @param {synthjs.audiocore.Filter}
 * @return {synthjs.audiocore.Generator}
 */
synthjs.audiocore.DynamicGenerator.prototype.addFilter = function(filter){
	filter.setSampleRate(this._sampleRate);
	this._filters.push(filter);
	return this;
};

/**
 * Creates a sequence object to be posted to worker.
 * @constructor
 */
synthjs.audiocore.DynamicGeneratorSequence = function(){
	this._sequenceArray = [];
};

synthjs.audiocore.DynamicGeneratorSequence.prototype.pushGetBuffer = function(len){
	this._sequenceArray.push({
		"action": "getbuffer",
		"length": len});
};

synthjs.audiocore.DynamicGeneratorSequence.prototype.pushSet = function(id, value){
	this._sequenceArray.push({
		"action": "set",
		"id": id,
		"value": value
	});
};

synthjs.audiocore.DynamicGeneratorSequence.prototype.pushNoteOn = function(noteid, velocity){
	this._sequenceArray.push({
		"action": "midi",
		"type": "noteon",
		"note": noteid,
		"velocity": velocity/128
	});
};

synthjs.audiocore.DynamicGeneratorSequence.prototype.pushNoteOff = function(noteid, velocity){
	this._sequenceArray.push({
		"action": "midi",
		"type": "noteoff",
		"note": noteid,
		"velocity": velocity/128
	});
};

synthjs.audiocore.DynamicGeneratorSequence.prototype.pushNoteAllOff = function(){
	this._sequenceArray.push({
		"action": "midi",
		"type": "ntoealloff"
	});
};

synthjs.audiocore.DynamicGeneratorSequence.prototype.getSequence = function(){
	return this._sequenceArray;
};