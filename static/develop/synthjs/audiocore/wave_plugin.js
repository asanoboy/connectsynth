goog.provide("synthjs.audiocore.WavePlugin");
goog.provide("synthjs.audiocore.WavePluginEventType");
goog.provide("synthjs.audiocore.WaveEvent");
goog.require("synthjs.utility.WorkerDeferredManager");
goog.require('synthjs.utility.EventTarget');

/**
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 * @param {string} url
 * @param {array} opt_params
 */
synthjs.audiocore.WavePlugin = function(url, opt_params){
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
	this._sampleRate = opt_params && opt_params.sampleRate ? opt_params.sampleRate : 48000;
	if( !(opt_params && opt_params.sampleRate) ){
		console.log("wavePlugin set default sample rate: 48000");
	}
	
	/**
	 * @private
	 */
	this._initialized = false;
	
	/**
	 * @private
	 */
	this._worker = new Worker(url);
	this._workerCreator = new synthjs.utility.WorkerDeferredManager(this._worker);
	
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
}

synthjs.audiocore.WavePlugin.prototype.getUrl = function(){
	return this._url;
}

synthjs.audiocore.WavePlugin.prototype.clone = function(){
	return new synthjs.audiocore.WavePlugin(this._url, {sampleRate: this._sampleRate}); 
}

/**
 * @param {array} opt_params
 */
synthjs.audiocore.WavePlugin.prototype.initDeferred = function(opt_params){
	this._initialized = true;
	var self = this;
	//return new synthjs.utility.WorkerDeferred(this._worker, 
	return this._workerCreator.create(
		{'action':'init', "initParams": {"sampleRate": this._sampleRate}})
		.addCallback(function(e){
			self.dispatchEvent(new goog.events.Event(
				synthjs.audiocore.WavePluginEventType.INIT, 
				e));
			return e;
		});

}

/**
 * @param {synthjs.audiocore.WaveEvent} event
 */
synthjs.audiocore.WavePlugin.prototype.addEventDeferred = function(event){
	//var workerD = new synthjs.utility.WorkerDeferred(this._worker, 
	var workerD = this._workerCreator.create(
		{action:'addEvent', event:event});
		
	if( this._initialized ){
		return workerD;
	}
	else {
		//return this.initDeferred().addCallback(function(e){d.callback(e);}).awaitDeferred(d);
		return this.initDeferred().assocChainDeferred(workerD);
	}
	
}



synthjs.audiocore.WavePlugin.prototype.getBufferDeferred = function(len){
	
	var workerD = this._workerCreator.create( 
		{action:'getBuffer', length:len},
		{error: function(){
			console.log("GET BUFFER ERROR");
			return {leftBuffer: new Float32Array(len), rightBuffer: new Float32Array(len)};
		}}
	);
		
		
	if( this._initialized ){
		var d = workerD;
	}
	else {
		var d = this.initDeferred().assocChainDeferred(workerD);
		//return this.initDeferred().assocChainDeferred(workerD);
	}
	
	return d.addCallback(function(e){
		return {
			leftBuffer: e['leftBuffer'],
			rightBuffer: e['rightBuffer']
		};
	});
}

/**
 * @param {string} name
 * @param {number} value
 */
synthjs.audiocore.WavePlugin.prototype.setParamDeferred = function(name, value){
	return this._workerCreator.create(
		{action:'setParam', name: name, value: value},
		{error: function(){
			goog.asserts.assert("Can't set param to plugin");
		}}
	);
}

/**
 * MIDIイベントと出来るだけ互換性があるようにしておく
 * @constructor
 * @param {string} type synthjs.audiocore.WaveEventType
 */
synthjs.audiocore.WaveEvent = function(type, opt_params){
	/**
	 * @private
	 */
	this['type'] = type;
	
	var eventType = synthjs.audiocore.WaveEventType;
	if( type==eventType.NOTEON || type==eventType.NOTEOFF ){
		
		if( opt_params.note.constructor != synthjs.audiocore.Note || opt_params.velocity )
		
		this['note'] = {
			"freq" : opt_params.note.freq
		};
			
		this['velocity'] = opt_params.velocity;
	}
	// else if( type==eventType.NOTEALLOFF ){
// 		
	// }
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