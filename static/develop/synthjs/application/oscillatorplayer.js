goog.provide("synthjs.application.OscillatorPlayer");


goog.require("synthjs.application.Base");
goog.require("goog.dom");
goog.require("goog.Uri");

//goog.require("goog.dom.ViewportSizeMonitor");

goog.require("synthjs.ui.MenuBar");
goog.require("synthjs.ui.Menu");

goog.require("synthjs.ui.SDKOscillator");
goog.require("synthjs.ui.window.Code");
goog.require("synthjs.ui.window.Image");
goog.require("synthjs.ui.window.WindowHolder");

goog.require("goog.events.EventHandler");
goog.require("synthjs.ui.KeyboardEventType");

goog.require("synthjs.ui.window.Oscillator");
goog.require("synthjs.ui.Keyboard");
goog.require("synthjs.ui.VerticalKeyboardRenderer");
goog.require("synthjs.audiocore.Note");
//goog.require("synthjs.audiocore.Player");
goog.require("synthjs.audiocore.WavePlugin");
goog.require("synthjs.audiocore.DynamicGenerator");

goog.require("synthjs.application.module.Oscillator");
goog.require("goog.ui.Dialog");
goog.require("goog.ui.Dialog.ButtonSet");
goog.require("goog.ui.Dialog.DefaultButtonKeys");
goog.require("synthjs.application.api.Plugin");

/**
 * @constructor
 * @extends {synthjs.application.Base}
 */
synthjs.application.OscillatorPlayer = function(id, params){
	
	/**
	 * @private
	 */
	this._isOscillatorEditable = false;
	
	/**
	 * @private 
	 */
	this._apiPlugin = new synthjs.application.api.Plugin(params['code']);
	this._bootstrapJs = params['bootstrapJs'];
	this._extendUri = new goog.Uri(params['extendapi']);
	this._onReady = goog.isFunction(params['onReady']) ? params['onReady'] : goog.nullFunction; 
	goog.base(this, id);
	//this._audioplayer =  synthjs.audiocore.Player.getInstance();
	
	/**
	 * @protected
	 * @type {synthjs.audiocore.WavePlugin} 
	 */
	this._wavePlugin = null;
	
};

goog.inherits(synthjs.application.OscillatorPlayer, synthjs.application.Base);

/**
 * @protected
 * @param {Boolean} flag
 */
synthjs.application.OscillatorPlayer.prototype._setIsOscillatorEditable = function(flag){
	this._isOscillatorEditable = flag;
}

synthjs.application.OscillatorPlayer.prototype.getApi = function(){
	return this._apiPlugin;
}

/**
 * @protected
 */
synthjs.application.OscillatorPlayer.prototype._init = function(){
	//this.launchOscillator();
	this._onReady();
}


/**
 * @protected
 */
synthjs.application.OscillatorPlayer.prototype._bootstrapJs = null;

/**
 * @private {synthjs.audiocore.Generator}
 */
synthjs.application.OscillatorPlayer.prototype._debugGenerator = null;

/**
 * @private {synthjs.audiocore.WavePlugin}
 */
synthjs.application.OscillatorPlayer.prototype._debugWavePlugin = null;

/**
 * @private {synthjs.audiocore.Window}
 */
synthjs.application.OscillatorPlayer.prototype._debugWindow = null;


/**
 * @override
 */
synthjs.application.OscillatorPlayer.prototype._getMenuComponent = function(){
	// return synthjs.ui.MenuBar.createFromSetting(
	// 	[
	// 		{label:"Control", sublist: [
	// 			{label:'Copy To Workspace', callback: goog.bind(this.onExtendOscillator, this)},
	// 			{label:'About', callback: goog.bind(this.onShowInformation, this)}
	// 		]}
	// 	]
	// );
}


// synthjs.application.OscillatorPlayer.prototype.onExtendOscillator = function(){
// 	var dialog = new goog.ui.Dialog(null, false);
// 	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
// 	dialog.setTitle("Attention");
// 	//dialog.setContent("This intends to copy this plugin to your workspace. If your plugin exists in the workspace, it will be deleted.");
// 	dialog.setContent("This action requires you to sign in. Have you already signed in?");

// 	this.getHandler()
// 		.listen(
// 			dialog,
// 			goog.ui.Dialog.EventType.SELECT,
// 			function(e){
// 				if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
// 					document.location = this.getApi().copyPlugin().toString();//this._extendUri.toString();
// 				}
// 				this.getHandler().unlisten(dialog);
// 			}
// 		);
// 	dialog.setVisible(true);
// }


// synthjs.application.OscillatorPlayer.prototype.onShowInformation = function(){
	
// }

/**
 * @override
 */
synthjs.application.OscillatorPlayer.prototype._getBodyComponent = function(){
	if( !this._bodyComponent ){
		this._bodyComponent = this._getWindowHolderComponent(); 
	}
	return this._bodyComponent;
}

/**
 * @protected
 */
synthjs.application.OscillatorPlayer.prototype._getWindowHolderComponent = function(){
	if( !this._windowHolder ){
		this._windowHolder = new synthjs.ui.window.WindowHolder();
	}
	return this._windowHolder; 
}

/**
 * @protected
 */
synthjs.application.OscillatorPlayer.prototype._attachEvents = function(){
	
	this.getHandler()
		// Attach keyboard shortcut
		.listen(document, 
			goog.events.EventType.KEYDOWN, 
			this.onPressKey);

}

/**
 * Set keyboard shortcut
 */
synthjs.application.OscillatorPlayer.prototype.onPressKey = function(e){
	
}


/**
 * @public
 */
synthjs.application.OscillatorPlayer.prototype.closeOscillator = function(){
	
	if( this._oscillatorModule ){
		var window = this._oscillatorModule.getWindow();
		if( window ){
			this._windowHolder.removeWindow( this._oscillatorModule.getWindow() );
			window.dispose();
		}
		this._oscillatorModule.dispose();
		delete this._oscillatorModule; 
	}
}

/**
 * @protected 
 */
synthjs.application.OscillatorPlayer.prototype.createOscillatorInternal = function(){
	if( this._wavePlugin ){
		this._wavePlugin.dispose();
		this._wavePlugin = null;
	}
	this._wavePlugin = new synthjs.audiocore.WavePlugin(this.getApi().getFile("bootstrap.js?bootstrap=1").toString(), {sampleRate: 48000});
	return new synthjs.application.module.Oscillator(
		this._wavePlugin, 
		this.getApi(), 
		this._isOscillatorEditable);
}

synthjs.application.OscillatorPlayer.prototype.getOscillatorModule = function(){
	return this._oscillatorModule || false;
}

/**
 * @private
 */
synthjs.application.OscillatorPlayer.prototype.launchOscillator = function(){


	this._oscillatorModule = this.createOscillatorInternal();
	
	this.getHandler()
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

/**
 * When instrument crushes, this is called.
 */
synthjs.application.OscillatorPlayer.prototype._onOscillatorError = function(e){
	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
	dialog.setTitle("Alert");
	dialog.setContent(e.target.error.message + " on " + e.target.error.filename);
	this.getHandler()
		.listen(
			dialog,
			goog.ui.Dialog.EventType.SELECT,
			function(e){
				this.getHandler().unlisten(dialog);
			}
		)
	dialog.setVisible(true);	
}

synthjs.application.OscillatorPlayer.prototype._onOscillatorInit = function(e){
	this._windowHolder.addWindow( this._oscillatorModule.getWindow() );	
}

window['OscillatorPlayer'] = synthjs.application.OscillatorPlayer;