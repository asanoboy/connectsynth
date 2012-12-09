goog.provide("synthjs.application.BareOscillator");

goog.require("goog.dom");
goog.require("goog.events.EventHandler");
goog.require("synthjs.application.api.Plugin");
goog.require("synthjs.application.module.OscillatorEventType");
goog.require("synthjs.application.module.Oscillator");

/**
 * @constructor
 */
synthjs.application.BareOscillator = function(id, code){
	
	/**
	 * @private
	 */
	this._api = new synthjs.application.api.Plugin(code);
	this._domId = id;
	this._wavePlugin = new synthjs.audiocore.WavePlugin(
		this._api.getFile("main.js").toString(), 
		{
			sampleRate: 48000
		});
	this._oscillatorModule = new synthjs.application.module.Oscillator(
		this._wavePlugin, 
		this._api, 
		false);
	
	this._handler = new goog.events.EventHandler(this);
	
	this._handler
		.listen(
			this._oscillatorModule,
			synthjs.application.module.OscillatorEventType.INIT,
			this._onOscillatorInit
		)
		.listen(
			this._oscillatorModule,
			synthjs.application.module.OscillatorEventType.ERROR,
			this._onOscillatorError
		);
	this._oscillatorModule.init();
}

synthjs.application.BareOscillator.prototype._onOscillatorInit = function(){
	
	this._oscillatorModule.getWindow().decorate(goog.dom.getElement(this._domId));
	this._oscillatorModule.getWindow().resize();
	
	
	this._handler
		.listen(
			goog.dom.getWindow(), 
			goog.events.EventType.RESIZE, 
			this.onResize
		);
}

synthjs.application.BareOscillator.prototype._onOscillatorError = function(e){
	alert("error");
}

synthjs.application.BareOscillator.prototype.onResize = function(e){
	this._oscillatorModule.getWindow().resize();
}

window['BareOscillator'] = synthjs.application.BareOscillator;