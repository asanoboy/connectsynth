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
goog.require("goog.ui.Prompt");
goog.require("goog.ui.Dialog");
goog.require("goog.ui.Dialog.ButtonSet");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.audiocore.WavePluginEventType");
goog.require("synthjs.ui.window.Oscillator");
goog.require("synthjs.ui.Keyboard");
goog.require("synthjs.ui.VerticalKeyboardRenderer");
goog.require("synthjs.audiocore.Note");
goog.require("synthjs.audiocore.Player");
// goog.require("synthjs.audiocore.WavePlugin");
goog.require("synthjs.audiocore.DynamicGenerator");
goog.require("synthjs.audiocore.MidiInterface");

/**
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 * @param {synthjs.audiocore.WavePlugin}
 * @param {synthjs.application.api.Plugin} api
 * @param {boolean=} opt_isEditable
 */
synthjs.application.module.Oscillator = function(plugin, api, opt_isEditable){
	this._isEditable = goog.isNull(opt_isEditable) ? false : !!opt_isEditable ;
	this._wavePlugin = plugin;
	goog.base(this);

	this._api = api;

	this._bootstrapUri = api.getFile("bootstrap.js?bootstrap=1");

};

goog.inherits(synthjs.application.module.Oscillator, synthjs.utility.EventTarget);

synthjs.application.module.Oscillator.prototype.getApi = function(){
	return this._api;
};

synthjs.application.module.Oscillator.prototype.init = function(){

	this._audioplayer =  synthjs.audiocore.Player.getInstance();

	this._generator = new synthjs.audiocore.DynamicGenerator(this._wavePlugin);
	this._audioplayer.addGenerator(this._generator);
	this._audioplayer.play();

	var midiInterface = synthjs.audiocore.MidiInterface.getInstance();

	this._keyboard = new synthjs.ui.Keyboard(
		synthjs.audiocore.Note.create('c', -4),
		synthjs.audiocore.Note.create('c', 5),
		synthjs.ui.VerticalKeyboardRenderer.getInstance());

	this.getHandler()
		.listen(
			this._keyboard,
			synthjs.ui.KeyboardEventType.ON,
			this._onHandler)
		.listen(
			this._keyboard,
			synthjs.ui.KeyboardEventType.OFF,
			this._offHandler)
		.listen(
			midiInterface,
			synthjs.audiocore.MidiInterface.EventType.ON,
			this._onHandler)
		.listen(
			midiInterface,
			synthjs.audiocore.MidiInterface.EventType.OFF,
			this._offHandler)
		.listen(
			this._wavePlugin,
			synthjs.audiocore.WavePluginEventType.ERROR,
			this._errorHandler)
		.listen(
			this._wavePlugin,
			synthjs.audiocore.WavePluginEventType.INIT,
			this._initHandler)
		;
};

synthjs.application.module.Oscillator.prototype.getWindow = function(){
	return this._oscillatorWindow;
};

synthjs.application.module.Oscillator.prototype.disposeInternal = function(){
	goog.ui.Component.superClass_.disposeInternal.call(this);
	// Don't dispose plugin.
	//this._wavePlugin.dispose();	
};

synthjs.application.module.Oscillator.prototype._onHandler = function(e){
	this._keyboard.markKey(e.target.note.getMidiNum());
	this._generator.addNoteDeferred(e.target.note).callback();
};

synthjs.application.module.Oscillator.prototype._offHandler = function(e){
	this._keyboard.demarkKey(e.target.note.getMidiNum());
	this._generator.removeNoteDeferred(e.target.note).callback();
};

synthjs.application.module.Oscillator.prototype._errorHandler = function(e){

	this._audioplayer.removeGenerator(this._generator);
	this.getHandler()
		.unlisten( this._keyboard, synthjs.ui.KeyboardEventType.ON, this._onHandler)
		.unlisten( this._keyboard, synthjs.ui.KeyboardEventType.OFF, this._offHandler);

	var event = new goog.events.Event(synthjs.application.module.OscillatorEventType.ERROR, {error: e.error});
	this.dispatchEvent(event);
};

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

		var controls = goog.isArray( controller['controls']) ? controller['controls'] : [];

		var isValid = true;
		goog.array.forEach(controls, function(control){
			//if( !goog.isString( control['name'] ) || !goog.isNumber( control['value'] ) ){
			if( !goog.isString( control['id'] ) || !goog.isNumber( control['value'] ) ){
				isValid = false;
				return;
			}

            var controlParam;
			switch(control['type']){
				case 'knob':
                    var max, min;
					if( goog.isNumber(control['min']) && goog.isNumber(control['max']) &&
							control['min'] < control['max'] ){
						min = parseFloat(control['min']);
                        max = parseFloat(control['max']);
					}
					else{
						min = 0;
                        max = 1;
					}
					var step = parseFloat(control['step']) || 0.001;
					var labelEnabled = goog.isDef(control['label']) ? !!control['label'] : false;
					var labelPosition = false;//goog.isDef(control['labelposition']) ? control['labelposition'] : false;
					var labelOffsetX = goog.isDef(control['labeloffsetx'])&&goog.isNumber(control['labeloffsetx']) ? control['labeloffsetx'] : 0;
					var labelOffsetY = goog.isDef(control['labeloffsety'])&&goog.isNumber(control['labeloffsety']) ? control['labeloffsety'] : 0;
					var labelPrefix = goog.isDef(control['labelprefix'])&&goog.isString(control['labelprefix']) ? control['labelprefix'] :	false;
					var labelPostfix = goog.isDef(control['labelpostfix'])&&goog.isString(control['labelpostfix']) ? control['labelpostfix'] : false;


					controlParam = new synthjs.model.PluginControlParam(
						control['id'],
						control['value'],
						min,max,step,
						control['width'],
						control['height'],
						control['offsetx'],
						control['offsety'],
						this._bootstrapUri.resolve(new goog.Uri(control['image'])).toString(),
						labelEnabled, labelPosition, labelPrefix, labelPostfix, labelOffsetX, labelOffsetY
					);
					break;
				case 'toggle':
					controlParam = new synthjs.model.PluginToggleParam(
						control['id'],
						control['value'],
						control['width'],
						control['height'],
						control['offsetx'],
						control['offsety'],
						this._bootstrapUri.resolve(new goog.Uri(control['imageon'])).toString(),
						this._bootstrapUri.resolve(new goog.Uri(control['imageoff'])).toString()
					);
					break;
				case 'radio':
					var offsets = [];
					goog.array.forEach(control['offsets'], function(offset){
						offsets.push({
							offsetX: offset['offsetx'],
							offsetY: offset['offsety']
						});
					});
					controlParam = new synthjs.model.PluginRadioParam(
						control['id'],
						control['value'],
						control['width'],
						control['height'],
						offsets,
						this._bootstrapUri.resolve(new goog.Uri(control['imageon'])).toString(),
						this._bootstrapUri.resolve(new goog.Uri(control['imageoff'])).toString()
					);
					break;
				default:
					throw new Error("invalid param");
			}

			this._paramCollection.add(controlParam);
			this._wavePlugin.setParamDeferred(control['id'], control['value']).callback();
		}, this);

		if( isValid ){
			goog.array.forEach(this._paramCollection.getAll(), function(model){
				this.getHandler().listen(model,
					synthjs.model.EventType.CHANGE,
					this._updateParam);
			}, this);
		}
		else{
			alert("Plugin init parameter is invalid.");
			return;
		}

		this._controlPanel = new synthjs.ui.PluginControlPanel(
			this._paramCollection,
			this._bootstrapUri.resolve(new goog.Uri(controller['background']['image'])).toString(),
			controller['background']['width'],
			controller['background']['height']);
		this._controlPanelContainer = new synthjs.ui.PluginControlPanelContainer(
			this._controlPanel,
			this._isEditable);

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

		this._backgroundWidth = controller['background']['width'];
		this._backgroundHeight = controller['background']['height'];

	}

	this._oscillatorWindow = new synthjs.ui.window.Oscillator(
		this._keyboard,
		this._controlPanelContainer || null ,
		{
			isDeletable: this._isEditable
		}
	);

	this.getHandler().listen(
		this._oscillatorWindow,
		synthjs.ui.window.EventType.CLOSE,
		this.dispose);

	this._updatePresets();

	this.dispatchEvent(new goog.events.Event(synthjs.application.module.OscillatorEventType.INIT) );
};

synthjs.application.module.Oscillator.prototype.getWidth = function(){
	return this._backgroundWidth ? this._backgroundWidth : 0;
};
synthjs.application.module.Oscillator.prototype.getHeight = function(){
	return this._backgroundHeight ? this._backgroundHeight + 26 : 0; // 26 is preset height;
};

/**
 * @param {string=} opt_presetCode Initial preset code 
 */
synthjs.application.module.Oscillator.prototype._updatePresets = function(opt_presetCode){
    this.getApi().getPresetsDeferred()
        .addCallback(goog.bind(function(r){
            if( r.isSuccess() ){

                this._presetCollection = new synthjs.model.Collection(synthjs.model.PluginPreset);
                goog.array.forEach(r.data, function(r){
                    var presetParam = new synthjs.model.PluginPreset(r['name'], r['code'], r['value']);
                    if( presetParam.isValid() ){
                        this._presetCollection.add(presetParam);
                    }
                },
                this);

                if( this._controlPanelContainer ){
                    this._controlPanelContainer.updatePresets(
                        this._presetCollection,
                        opt_presetCode
                    );
                }
            }
            else {
                alert("error");
            }
        },this))
        .callback();

    return;
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
};

synthjs.application.module.Oscillator.prototype.onPresetAdd = function(e){
	var param = [];
	goog.array.forEach(this._paramCollection.getAll(), function(model){
		param.push({'name':model.get('name'), 'value':model.get("value")});
	}, this);

	var value = goog.json.serialize(param);
	var prompt = new goog.ui.Prompt("Save Preset",
		"Input preset name:",
		goog.bind(function(name){
			if( name === null ){
				return;
			}

			this.getApi().postPresetDeferred(name, value)
                .addCallbacks(goog.bind(function(r){
                    if( r.isSuccess() ){
                        goog.asserts.assert(r.data, "Invalid response from post preset api.");
                        this._updatePresets(r.data);
                    }
                    else {
                        alert("server error");
                    }
                }, this))
                .callback();

		}, this)
	);
	prompt.setVisible(true);


};

synthjs.application.module.Oscillator.prototype._deletePreset = function(code){
	var preset = goog.array.find(this._presetCollection.getAll(), function(p){
		return p.get("code")==code;
	});

	goog.asserts.assert(preset, "Invalid preset code was deleted.");

	if( preset ){
		var dialog = new goog.ui.Dialog();
		dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
		dialog.setTitle("Confirmation");
		dialog.setContent("Do you delete '"+preset.get('name')+"' preset?");
		this.getHandler().listen(
			dialog,
			goog.ui.Dialog.EventType.SELECT,
			function(e){
				this.getHandler().unlisten(dialog);
				if( e.key=='ok' ){
                    this.getApi().deletePresetDeferred(code)
                        .addCallback(goog.bind(function(r){
                            if(r.isSuccess()){
                                this._updatePresets();
                            }
                            else {
                                alert("server error.");
                            }
                        }, this))
                        .callback();
				}
			}
		);
		dialog.setVisible(true);
	}
};

synthjs.application.module.Oscillator.prototype.onPresetChange = function(e){
	this._setPreset(e.target);
};

synthjs.application.module.Oscillator.prototype.onPresetDelete = function(e){
	this._deletePreset(e.target);
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
};

synthjs.application.module.OscillatorEventType = {
	INIT: "oscillator-init",
	ERROR: "oscillator-error"
};

