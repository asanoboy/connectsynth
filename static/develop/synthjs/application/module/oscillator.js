goog.provide("synthjs.application.module.Oscillator");
goog.provide("synthjs.application.module.OscillatorEventType");

goog.require("synthjs.model.PluginControlParam");
goog.require("synthjs.model.PluginToggleParam");
goog.require("synthjs.model.PluginRadioParam");
goog.require("synthjs.model.PluginPreset");
goog.require("synthjs.model.Collection");
goog.require("synthjs.ui.PluginControlPanel");
goog.require("synthjs.ui.PluginControlPanelContainer");

goog.require("goog.events.EventTarget");
goog.require("goog.json");
goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.utility.AjaxDeferred");
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
 * @param {boolean=} opt_isEditable
 * @param {Object} opt_presetApis
 */
synthjs.application.module.Oscillator = function(bootstrapUri, opt_isEditable, opt_presetApis){
	this._isEditable = goog.isNull(opt_isEditable) ? false : true;
	if( this._isEditable ){
		if( !opt_presetApis.post || !opt_presetApis.del || !opt_presetApis.list ){
			goog.asserts.fail("If editable, opt_presetApis is repuired.");
		}
		/** @type {goog.Uri} */
		this._presetPostUri = opt_presetApis.post;
		/** @type {goog.Uri} */
		this._presetDeleteUri = opt_presetApis.del;
		/** @type {goog.Uri} */
		this._presetListUri = opt_presetApis.list;
	}
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
	
	this._paramCollection = new synthjs.model.Collection(synthjs.model.Base);
	
		
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
			
			this._paramCollection.add(control);

		}, this);
		
		if( isValid ){
			goog.array.forEach(this._paramCollection.getAll(), function(model){
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
			this._paramCollection,
			this._bootstrapUri.resolve(new goog.Uri(controller['background']['image'])).toString(),
			controller['background']['width'],
			controller['background']['height']);
		this._controlPanelContainer = new synthjs.ui.PluginControlPanelContainer(this._controlPanel, this._isEditable);	
		
		this.getHandler().listen(
				this._controlPanelContainer,
				synthjs.ui.PluginControlPanelContainer.EventType.PRESET_ADD,
				this.onPresetAdd
			)
			.listen(
				this._controlPanelContainer,
				synthjs.ui.PluginControlPanelContainer.EventType.PRESET_CHANGE,
				this.onPresetChange
			)
			.listen(
				this._controlPanelContainer,
				synthjs.ui.PluginControlPanelContainer.EventType.PRESET_DELETE,
				this.onPresetDelete
			);
		
	}

	if( this._controlPanelContainer ){
		this._oscillatorWindow = new synthjs.ui.window.Oscillator( this._keyboard, this._controlPanelContainer );
	}
	else {
		this._oscillatorWindow = new synthjs.ui.window.Oscillator( this._keyboard );
	}
	
	this._updatePresets();
		
	this.dispatchEvent(new goog.events.Event(synthjs.application.module.OscillatorEventType.INIT) );
}

synthjs.application.module.Oscillator.prototype._updatePresets = function(e){
	new synthjs.utility.AjaxDeferred(this._presetListUri.toString(), {
		method: "GET",
		success: function(e){
			/* validate */
			var rs = e.getResponseJson();
			if( goog.isArray(rs) ){
				this._presetCollection = new synthjs.model.Collection(synthjs.model.PluginPreset);
				goog.array.forEach(rs, function(r){
					if( goog.isDef(r['name']) && goog.isDef(r['value']) && goog.isDef(r['code']) ){
						var presetParam = new synthjs.model.PluginPreset(r['name'], r['code'], r['value']);
						if( presetParam.isValid() ){
							this._presetCollection.add(presetParam);
						}
					}
				}, this);
				
				this._controlPanelContainer.updatePresets(
					this._presetCollection
				);
			}
		}
	}, this).callback();
};

synthjs.application.module.Oscillator.prototype._setPreset = function(code){
	var preset = goog.array.find(this._presetCollection.getAll(), function(p){
		return p.get("code")==code;
	});
	
	goog.asserts.assert(preset, "Invalid preset code was set.");
	
	if( preset ){
		goog.array.forEach(preset.get("value"), function(param){
			if( goog.isDef(param.name) && goog.isDef(param.value) ){
				var model = goog.array.find(this._paramCollection.getAll(), function(p){
					return param.name == p.get("name");
				}, this);
				if (model){
					model.set("value", param.value);
				}	
			}
		}, this);
	}
}
synthjs.application.module.Oscillator.prototype.onPresetAdd = function(e){
	var param = [];
	goog.array.forEach(this._paramCollection.getAll(), function(model){
		param.push({'name':model.get('name'), 'value':model.get("value")});
	}, this);
	
	var value = goog.json.serialize(param);
	new synthjs.utility.AjaxDeferred(this._presetPostUri.toString(), {
		method: "POST",
		data: {"name": "oraora", "value": value},
		success: function(e){
			var rs = e.getResponse();
			if( rs == 'ok'){
				this._updatePresets();
			}
			else {
				alert("server error.")
			}
		}
	}, this).callback();
			
};

synthjs.application.module.Oscillator.prototype.onPresetChange = function(e){
	this._setPreset(e.target);
};

synthjs.application.module.Oscillator.prototype.onPresetDelete = function(e){
	console.log("delete");
	console.log(e);
};


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

