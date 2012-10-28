goog.provide("synthjs.application.module.Oscillator");
goog.provide("synthjs.application.module.OscillatorEventType");

goog.require("synthjs.model.PluginControlParam");
goog.require("synthjs.model.PluginToggleParam");
goog.require("synthjs.model.PluginRadioParam");
goog.require("synthjs.model.Collection");
goog.require("synthjs.ui.PluginControlPanel");

goog.require("goog.events.EventTarget");
goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.audiocore.WavePluginEventType");
goog.require("synthjs.ui.window.Oscillator");
goog.require("synthjs.ui.Keyboard");
goog.require("synthjs.ui.VerticalKeyboardRenderer");
goog.require("synthjs.audiocore.Note");
goog.require("synthjs.audiocore.Player");
goog.require("synthjs.audiocore.WavePlugin");
goog.require("synthjs.audiocore.DynamicGenerator");


/**
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 * @param {goog.Uri} bootstrapUri
 */
synthjs.application.module.Oscillator = function(bootstrapUri){
	
	goog.base(this);
	
	this._bootstrapUri = bootstrapUri;
	
}

goog.inherits(synthjs.application.module.Oscillator, synthjs.utility.EventTarget);

synthjs.application.module.Oscillator.prototype.init = function(){
	
	this._audioplayer =  synthjs.audiocore.Player.getInstance();
	//this._wavePlugin = new synthjs.audiocore.WavePlugin(this._baseUri.toString() + this._filename, {sampleRate: 48000});
	this._wavePlugin = new synthjs.audiocore.WavePlugin(this._bootstrapUri.toString(), {sampleRate: 48000});
	
	this._generator = new synthjs.audiocore.DynamicGenerator(this._wavePlugin);
	this._audioplayer.addGenerator(this._generator);
	this._audioplayer.play();

		
	this._keyboard = new synthjs.ui.Keyboard( 
		synthjs.audiocore.Note.create('c', -4),
		synthjs.audiocore.Note.create('c', 4),
		synthjs.ui.VerticalKeyboardRenderer.getInstance());
	
	this.getHandler().listen( 
			this._keyboard, 
			synthjs.ui.KeyboardEventType.ON, 
			this._onHandler, false, this)
		.listen( 
			this._keyboard, 
			synthjs.ui.KeyboardEventType.OFF, 
			this._offHandler, false, this)
		.listen( 
			this._wavePlugin, 
			synthjs.audiocore.WavePluginEventType.ERROR, 
			this._errorHandler, false, this)
		.listen(
			this._wavePlugin,
			synthjs.audiocore.WavePluginEventType.INIT,
			this._initHandler, false, this)
		;
}

synthjs.application.module.Oscillator.prototype.getWindow = function(){
	return this._oscillatorWindow;
}

synthjs.application.module.Oscillator.prototype.disposeInternal = function(){
	goog.ui.Component.superClass_.disposeInternal.call(this);
	
}

synthjs.application.module.Oscillator.prototype._onHandler = function(e){
	this._generator.addNoteDeferred(e.note).callback();
};

synthjs.application.module.Oscillator.prototype._offHandler = function(e){
	this._generator.removeNoteDeferred(e.note).callback();
};

synthjs.application.module.Oscillator.prototype._errorHandler = function(e){

	this._audioplayer.removeGenerator(this._generator);
	this.getHandler()
		.unlisten( this._keyboard, synthjs.ui.KeyboardEventType.ON, this._onHandler)
		.unlisten( this._keyboard, synthjs.ui.KeyboardEventType.OFF, this._offHandler);
	
	var event = new goog.events.Event(synthjs.application.module.OscillatorEventType.ERROR, {error: e.error})
	this.dispatchEvent(event);
}

/**
 * This function is called when the plugin is initialized and validate initialize parameters.
 * This shows UI Component.
 * 
 */
synthjs.application.module.Oscillator.prototype._initHandler = function(e){
	
	var collection = new synthjs.model.Collection(synthjs.model.Base);
		
	var controller = e.target['controller'];
	if( controller ){
		
		if( !goog.isDef( controller['background']) ){
			alert("Plugin did not send 'background'");
			return;
		}
		
		if( !goog.isArray( controller['controls']) ){
			alert("Plugin did not send 'background'");
			return;
		}
		
		var isValid = true;
		goog.array.forEach(controller['controls'], function(control){
			if( !goog.isString( control['name'] ) || !goog.isNumber( control['value'] ) ){
				isValid = false;
				return;
			}
			
			switch(control['type']){
				case 'control':
					var control = new synthjs.model.PluginControlParam(
						control['name'], 
						control['value'],
						control['width'],
						control['height'],
						control['offsetX'],
						control['offsetY'],
						this._bootstrapUri.resolve(new goog.Uri(control['image'])).toString()
					); 
					break;
				case 'toggle':
					var control = new synthjs.model.PluginToggleParam(
						control['name'], 
						control['value'],
						control['width'],
						control['height'],
						control['offsetX'],
						control['offsetY'],
						this._bootstrapUri.resolve(new goog.Uri(control['imageOn'])).toString(),
						this._bootstrapUri.resolve(new goog.Uri(control['imageOff'])).toString()
					);
					break;
				case 'radio':
					var control = new synthjs.model.PluginRadioParam(
						control['name'], 
						control['value'],
						control['width'],
						control['height'],
						control['offsets'],
						this._bootstrapUri.resolve(new goog.Uri(control['imageOn'])).toString(),
						this._bootstrapUri.resolve(new goog.Uri(control['imageOff'])).toString()
					);
					break;
				default:
					throw new Error("invalid param");
			}
			
			collection.add(control);

		}, this);
		
		if( isValid ){
			goog.array.forEach(collection.getAll(), function(model){
				this.getHandler().listen(model, 
					synthjs.model.EventType.CHANGE,
					this._updateParam);				
			}, this)
			
			
		}
		else{
			alert("Plugin init parameter is invalid.;")
			return;
		}
		
		this._controlPanel = new synthjs.ui.PluginControlPanel(
			collection,
			this._bootstrapUri.resolve(new goog.Uri(controller['background']['image'])).toString(),
			controller['background']['width'],
			controller['background']['height']);		
	}

	if( this._controlPanel ){
		this._oscillatorWindow = new synthjs.ui.window.Oscillator( this._keyboard, this._controlPanel );
	}
	else {
		this._oscillatorWindow = new synthjs.ui.window.Oscillator( this._keyboard );
	}
		
	this.dispatchEvent(new goog.events.Event(synthjs.application.module.OscillatorEventType.INIT) );
}

/**
 * If plugin params are changed, this function posts message to plugin.
 */
synthjs.application.module.Oscillator.prototype._updateParam = function(e){
	var name = e.target.model.get("name");
	var value = e.target.after;
	
	goog.asserts.assertString(name, "'name' is not strings.");
	goog.asserts.assertNumber(value, "'value' is not number.");
	
	this._wavePlugin.setParamDeferred(name, value).callback();
}

synthjs.application.module.OscillatorEventType = {
	INIT: "oscillator-init",
	ERROR: "oscillator-error"
}

