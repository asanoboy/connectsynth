goog.provide("synthjs.audiocore.WavePlugin");
goog.provide("synthjs.audiocore.WavePluginEventType");
goog.provide("synthjs.audiocore.WaveEvent");
goog.require("synthjs.process.WorkerManager");
goog.require('synthjs.utility.EventTarget');

/**
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 * @param {string} url
 * @param {Number} sampleRate
 */
synthjs.audiocore.WavePlugin = function(url, sampleRate){  //opt_params){
	goog.base(this);
	/**
	 * @private
	 */
	this._url = url;
	
	/**
	 * @private
	 */
	this._failed = false;
	
	/**
	 * @private
	 */
	this._sampleRate = sampleRate;
	
	/**
	 * @private
	 */
	this._initialized = false;
	
	/**
	 * @private
	 */
	this._worker = new Worker(url);
	this._workerCreator = new synthjs.process.WorkerManager(this._worker);
	
	// this._worker.addEventListener('message', function(e){
		// if( !e["data"]["callback"] )
			// console.log(e.data);
	// });
//
	this._errorHandler = goog.bind(function(e){
		this._failed = true;
		var event = new goog.events.Event(synthjs.audiocore.WavePluginEventType.ERROR);
		event.error = e;
		this.dispatchEvent(event);
	}, this);
	
	this._worker.addEventListener('error', this._errorHandler);
	//this._eventHandler = new goog.events.EventHandler();
	this.getHandler().listen(document, goog.events.EventType.ERROR, this._errorHandler, false, this);
};
goog.inherits(synthjs.audiocore.WavePlugin, synthjs.utility.EventTarget);


synthjs.audiocore.WavePlugin.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
	
	this._worker.removeEventListener('error', this._errorHandler);
	this._eventHandler.dispose();
	
	this._workerCreator.dispose();
};

synthjs.audiocore.WavePlugin.prototype.getUrl = function(){
	return this._url;
};

synthjs.audiocore.WavePlugin.prototype.clone = function(){
	return new synthjs.audiocore.WavePlugin(this._url, {sampleRate: this._sampleRate});
};

/**
 * @param {array} opt_params
 */
synthjs.audiocore.WavePlugin.prototype.initDeferred = function(opt_params){
	this._initialized = true;
	var self = this;
	//return new synthjs.process.WorkerDeferred(this._worker,
	return this._workerCreator.create(
		//{'action':'init', "initParams": {"sampleRate": this._sampleRate}})
		{'action':'init', "samplerate": this._sampleRate})
		.addCallback(function(e){
			self.dispatchEvent(new goog.events.Event(
				synthjs.audiocore.WavePluginEventType.INIT,
				e));
			return e;
		});

};

/**
 * @param {synthjs.audiocore.WaveEvent} event
 */
synthjs.audiocore.WavePlugin.prototype.addEventDeferred = function(event){
	//var workerD = new synthjs.process.WorkerDeferred(this._worker,
	var request = event.createPostObject();
	request['action'] = 'midi';
	
	var workerD = this._workerCreator.create(
		request);
		
	if( this._initialized ){
		return workerD;
	}
	else {
		//return this.initDeferred().addCallback(function(e){d.callback(e);}).awaitDeferred(d);
		return this.initDeferred().assocChainDeferred(workerD);
	}
	
};



synthjs.audiocore.WavePlugin.prototype.getBufferDeferred = function(len){
	var workerD = this._workerCreator.create(
		{action:'getbuffer', length:len},
		{error: function(){
			return {leftBuffer: new Float32Array(len), rightBuffer: new Float32Array(len)};
		}}
	);
		
	var d;
	if( this._initialized ){
		d = workerD;
	}
	else {
		d = this.initDeferred().assocChainDeferred(workerD);
		//return this.initDeferred().assocChainDeferred(workerD);
	}
	
	return d.addCallback(function(e){
		return {
			leftBuffer: e['leftbuffer'],
			rightBuffer: e['rightbuffer']
		};
	});
};

/**
 * Queries a lot action at once.
 * @param  {Array} sequence
 * @return {synthjs.utility.Deferred}
 */
synthjs.audiocore.WavePlugin.prototype.getBufferSequenciallyDeferred = function(sequence){
	var workerD = this._workerCreator.create(
		{action:'sequence', sequence: sequence},
		{error: function(){
			return {leftBuffer: new Float32Array(len), rightBuffer: new Float32Array(len)};
		}}
	);
		
	var d;
	if( this._initialized ){
		d = workerD;
	}
	else {
		d = this.initDeferred().assocChainDeferred(workerD);
		//return this.initDeferred().assocChainDeferred(workerD);
	}
	
	return d.addCallback(function(e){
		return {
			leftBuffer: e['leftbuffer'],
			rightBuffer: e['rightbuffer']
		};
	});
};

/**
 * @param {string} name
 * @param {number} value
 */
synthjs.audiocore.WavePlugin.prototype.setParamDeferred = function(name, value){
	return this._workerCreator.create(
		{action:'set', "id": name, "value": value},
		{error: function(){
			goog.asserts.assert("Can't set param to plugin");
		}}
	);
};

/**
 * MIDIイベントと出来るだけ互換性があるようにしておく
 * @constructor
 * @param {string} type synthjs.audiocore.WaveEventType
 */
synthjs.audiocore.WaveEvent = function(type, opt_params){
	/**
	 * @private
	 */
	//this['type'] = type;
	this.type = type;
	
	var eventType = synthjs.audiocore.WaveEventType;
	
	switch(type){
		case eventType.NOTEON:
			goog.asserts.assertInstanceof(opt_params.note, synthjs.audiocore.Note, "invalid");
			goog.asserts.assertNumber(opt_params.velocity, "invalid");
			this.note = opt_params.note;
			this.velocity = opt_params.velocity;
			break;
		case eventType.NOTEOFF:
			goog.asserts.assertInstanceof(opt_params.note, synthjs.audiocore.Note, "invalid");
			this.note = opt_params.note;
			break;
		case eventType.NOTEALLOFF:
			break;
		default:
			goog.asserts.fail('fail');
	}
}

synthjs.audiocore.WaveEvent.prototype.createPostObject = function(){
	var rt = {};
	rt['type'] = this.type;
	var eventType = synthjs.audiocore.WaveEventType;
	switch(this.type){
		case eventType.NOTEON:
			goog.asserts.assertInstanceof(this.note, synthjs.audiocore.Note, "invalid");
			goog.asserts.assertNumber(this.velocity, "invalid");
			rt['note'] = this.note.getMidiNum();
			rt['velocity'] = this.velocity;
			break;
		case eventType.NOTEOFF:
			goog.asserts.assertInstanceof(this.note, synthjs.audiocore.Note, "invalid");
			rt['note'] = this.note.getMidiNum();
			break;
		case eventType.NOTEALLOFF:
			break;
		default:
			goog.asserts.fail('fail');
	}
	return rt;
}

/**
 * This EventType is for plugin.
 */
synthjs.audiocore.WaveEventType = {
	NOTEON: "noteon",
	NOTEOFF: "noteoff",
	NOTEALLOFF: 'notealloff'
};

/**
 * This EventType is for plugin host.
 */
synthjs.audiocore.WavePluginEventType = {
	ERROR: "waveplugin_error",
	INIT: "waveplugin_init"
};
