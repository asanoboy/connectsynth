goog.provide("synthjs.application.OscillatorBase");

goog.require("goog.ui.Dialog");
goog.require("goog.ui.Dialog.ButtonSet");
goog.require("goog.ui.Dialog.DefaultButtonKeys");

goog.require("goog.dom");
goog.require("goog.events.EventHandler");

goog.require("synthjs.application.Base");
goog.require("synthjs.application.module.Oscillator");
goog.require("synthjs.application.api.Plugin");

goog.require("synthjs.ui.SDKOscillator");
goog.require("synthjs.ui.window.Code");
goog.require("synthjs.ui.window.Image");
goog.require("synthjs.ui.window.WindowHolder");
goog.require("synthjs.ui.window.Oscillator");

goog.require("synthjs.audiocore.WavePlugin");

goog.require("synthjs.model.Collection");
goog.require("synthjs.model.FileSystem");
goog.require("synthjs.model.TextFile");

// goog.require("goog.Uri");
// goog.require("synthjs.ui.MenuBar");
// goog.require("synthjs.ui.Menu");
// goog.require("synthjs.ui.KeyboardEventType");
// goog.require("synthjs.ui.Keyboard");
// goog.require("synthjs.ui.VerticalKeyboardRenderer");
// goog.require("synthjs.audiocore.Note");
// goog.require("synthjs.audiocore.DynamicGenerator");

/**
 * @constructor
 * @extends {synthjs.application.Base}
 */
synthjs.application.OscillatorBase = function(id, params){

	/*
	 * this._fileSystem and this._oscillatorName must be set before goog.base().
	 */
	this._fileSystem = new synthjs.model.FileSystem();


	this._oscillatorName = params && params['name'];

	/**
	 * @private
	 */
	this._isOscillatorEditable = false;

	/**
	 * @private 
	 */
	this._apiPlugin = new synthjs.application.api.Plugin(params['code']);
	this._bootstrapJs = params['bootstrapJs'];
	this._onReady = goog.isFunction(params['onReady']) ? params['onReady'] : goog.nullFunction;
	goog.base(this, id);


	var self = this;
	this.getApi()
		.getPathListDeferred()
		.addCallbacks(goog.bind(function(rt){
			if( rt.isSuccess() ){

				var d = new synthjs.utility.Deferred();
				goog.array.forEach(rt.data, function(path){
					d.assocChainDeferred(this.addFileDeferred(path));
				}, this);
				d.callback();
			}

		}, this))
		.callback();

	return;
};

goog.inherits(synthjs.application.OscillatorBase, synthjs.application.Base);

synthjs.application.OscillatorBase.prototype._getDirectoryControl = goog.abstractMethod;
/**
 * @protected
 * @param {Boolean} flag
 */
synthjs.application.OscillatorBase.prototype._setIsOscillatorEditable = function(flag){
	this._isOscillatorEditable = flag;
};

synthjs.application.OscillatorBase.prototype.getApi = function(){
	return this._apiPlugin;
};

/**
 * @protected
 */
synthjs.application.OscillatorBase.prototype._init = function(){
	//this.launchOscillator();
	this._onReady();
};


/**
 * @protected
 */
synthjs.application.OscillatorBase.prototype._bootstrapJs = null;

/**
 * @private {synthjs.audiocore.Generator}
 */
synthjs.application.OscillatorBase.prototype._debugGenerator = null;

/**
 * @private {synthjs.audiocore.WavePlugin}
 */
synthjs.application.OscillatorBase.prototype._debugWavePlugin = null;

/**
 * @private {synthjs.audiocore.Window}
 */
synthjs.application.OscillatorBase.prototype._debugWindow = null;


/**
 * @override
 */
synthjs.application.OscillatorBase.prototype._getMenuComponent = function(){
};



/**
 * @override
 */
synthjs.application.OscillatorBase.prototype._getBodyComponent = function(){
	if( !this._directory ){
		this._directory = this._getDirectoryControl();
	}

	if( !this._bodyComponent ){
		this._bodyComponent = new synthjs.ui.SplitPane(
			this._directory,
			this._getWindowHolderComponent(),
			goog.ui.SplitPane.Orientation.HORIZONTAL);
		this._bodyComponent.setInitialSize(170);
		this._bodyComponent.setHandleSize(5);
		this.getHandler().listen(
			this._bodyComponent,
			goog.ui.Component.EventType.CHANGE,
			function(){this._bodyComponent.onResize();}
		);
	}

	return this._bodyComponent;
};

/**
 * Add file to local virtual filesystem from server
 * @param {string} url
 */
synthjs.application.OscillatorBase.prototype.addFileDeferred = function(path){
	var resType = synthjs.net.XhrIo.guessFileType(path);

	var paths = path.split('/');
	var filename = paths.pop();

	return this.getApi()
		.getFileDeferred(path)
		.addCallback(goog.bind(function(rt){
			if( rt.isSuccess() ){
				var file;
				if( typeof(rt.data)==="string" ){
					file = new synthjs.model.TextFile(filename, rt.data);
				}
				else if( rt.data instanceof Blob ){
					file = new synthjs.model.ImageFile(filename, rt.data);//.getResponse());//bb.getBlob(mimeType));
				}
			// create DIRECTORY recursive
				var parent = this._fileSystem.getRootDirectory(), directory;
				while( paths.length ){
					var directoryName = paths.shift();
					directory = new synthjs.model.Directory(directoryName);
					if( this._fileSystem.isDuplicate(directory, parent) ){
						parent = goog.array.find(
							this._fileSystem.getChildren(parent),
							function(child){
								return child.get("filename")==directoryName;
							});
						goog.asserts.assert(!!parent);
					}
					else {
						this._fileSystem.add(directory, parent);
						parent = directory;
					}
				}
				this._fileSystem.add(file, parent);
			}
		}, this));

};

/**
 * 
 */
synthjs.application.OscillatorBase.prototype.onDirectoryNodeSelect = function(e){
	switch(e.target.get("type")){
		case synthjs.model.FileType.TEXT:
			this._windowHolder.addWindow( new synthjs.ui.window.Code(e.target) );
			break;
		case synthjs.model.FileType.IMAGE:
			this._windowHolder.addWindow( new synthjs.ui.window.Image(e.target) );
			break;
	}
};

/**
 * @protected
 */
synthjs.application.OscillatorBase.prototype._getWindowHolderComponent = function(){
	if( !this._windowHolder ){
		this._windowHolder = new synthjs.ui.window.WindowHolder();
	}
	return this._windowHolder;
};

/**
 * @protected
 */
synthjs.application.OscillatorBase.prototype._attachEvents = function(){

	this.getHandler()
		// Attach keyboard shortcut
		.listen(document,
			goog.events.EventType.KEYDOWN,
			this.onPressKey);

	this.getHandler()
		// Create window of selected nodefile.
		.listen(
			this._directory,
			synthjs.ui.DirectoryControl.EventType.ACTIVE,
			this.onDirectoryNodeSelect);
};

/**
 * Set keyboard shortcut
 */
synthjs.application.OscillatorBase.prototype.onPressKey = function(e){

};


/**
 * @public
 */
synthjs.application.OscillatorBase.prototype.closeOscillator = function(){

	if( this._oscillatorModule ){
		var window = this._oscillatorModule.getWindow();
		if( window ){
			this._windowHolder.removeWindow( this._oscillatorModule.getWindow() );
			window.dispose();
		}
		this._oscillatorModule.dispose();
		delete this._oscillatorModule;
	}
};

/**
 * @protected 
 */
synthjs.application.OscillatorBase.prototype.createOscillatorInternal = function(){
	if( this._wavePlugin ){
		this._wavePlugin.dispose();
		this._wavePlugin = null;
	}
	this._wavePlugin = new synthjs.audiocore.WavePlugin(
		this.getApi().getFile("bootstrap.js?bootstrap=1").toString(),
		{sampleRate: 48000}
	);
	return new synthjs.application.module.Oscillator(
		this._wavePlugin,
		this.getApi(),
		this._isOscillatorEditable);
};

synthjs.application.OscillatorBase.prototype.getOscillatorModule = function(){
	return this._oscillatorModule || false;
};

/**
 * @private
 */
synthjs.application.OscillatorBase.prototype.launchOscillator = function(){
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
};

/**
 * When instrument crushes, this is called.
 */
synthjs.application.OscillatorBase.prototype._onOscillatorError = function(e){
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
		);
	dialog.setVisible(true);
};

synthjs.application.OscillatorBase.prototype._onOscillatorInit = function(e){
	this._windowHolder.addWindow( this._oscillatorModule.getWindow() );
};

window['OscillatorBase'] = synthjs.application.OscillatorBase;