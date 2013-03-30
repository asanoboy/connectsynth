goog.provide("synthjs.application.SDKOscillator");

goog.require("goog.ui.Prompt");
goog.require("goog.ui.Dialog");
goog.require("goog.ui.Dialog.ButtonSet");

goog.require("synthjs.application.OscillatorBase");

goog.require("synthjs.ui.DirectoryControl");
goog.require("synthjs.ui.TextPrompt");

// goog.require("synthjs.net.PluginPoster");

goog.require("synthjs.utility.BlobBuilder");

// goog.require("synthjs.model.Collection");
// goog.require("synthjs.model.FileSystem");
// goog.require("synthjs.model.TextFile");

/**
 * @constructor
 * @extends {synthjs.application.OscillatorBase}
 */
synthjs.application.SDKOscillator = function(id, params){

	goog.base(this, id, params);

	this._publishStatus = synthjs.application.SDKOscillator.StatusType.INITIAL;
	// this._publishUri = new goog.Uri(params['publishapi']);
	// this._presetPostUri = new goog.Uri(params['presetpostapi']);
	// this._presetDeleteUri = new goog.Uri(params['presetdeleteapi']);
	// this._presetListUri = new goog.Uri(params['presetlistapi']);
	this._setIsOscillatorEditable(true);
};

goog.inherits(synthjs.application.SDKOscillator, synthjs.application.OscillatorBase);

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._getMenuComponent = function(){
	return synthjs.ui.MenuBar.createFromSetting(
		[
			{label:"Workspace", sublist: [
				{label:'Run', callback: goog.bind(this.onDebugRun, this)},
				{label:'Publish', callback: goog.bind(this.onPublish, this)}
			]}
		]
	);
};

synthjs.application.SDKOscillator.prototype.onPublish = function(){
	switch( this._publishStatus ){
		case synthjs.application.SDKOscillator.StatusType.SUCCESS:
			this._showPublishPrompt();
			break;
		default:
			this._showPublishAlertPrompt();
			break;
	}
};

synthjs.application.SDKOscillator.prototype._showPublishPrompt = function(){
	var self = this;
	//var prompt = new goog.ui.Prompt("Input your instrument name", "Instrument Name:", goog.bind(function(name){
	var prompt = new synthjs.ui.TextPrompt("Publish Form", "Name and description of your instrument are required.", goog.bind(function(name, description){
		if( goog.isNull(name) ){
			return;
		}

		if( !name || !description ){
			var dialog = new goog.ui.Dialog(null, false);
			dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
			self.getHandler()
				.listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						self.getHandler().unlisten(dialog);
					}
				);
			dialog.setTitle("Abort");
			dialog.setContent("Fill both forms.");
			dialog.setVisible(true);
			return;
		}



		this.getApi().publishDeferred(
				name,
				description
			)
			.addCallbacks(function(r){
				if( r.isSuccess() ){
					var dialog = new goog.ui.Dialog(null, false);
					dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
					self.getHandler()
						.listen(
							dialog,
							goog.ui.Dialog.EventType.SELECT,
							function(){
								document.location = r.data;
							}
						);
					dialog.setTitle("Success");
					dialog.setContent("Move the page created now.");
					dialog.setVisible(true);
				}
				else {
					alert("Error Occurred!");
				}
			})
			.callback();

		return false;
	}, this));

	prompt.setCols(70);
	prompt.setTextRows(10);
	prompt.setVisible(true);
};

synthjs.application.SDKOscillator.prototype._showPublishAlertPrompt = function(){

	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);

	switch( this._publishStatus ){
		case synthjs.application.SDKOscillator.StatusType.INITIAL:
			dialog.setTitle("Attention");
			dialog.setContent("Please run the instrument before publish");
			break;
		case synthjs.application.SDKOscillator.StatusType.ERROR:
			dialog.setTitle("Attention");
			dialog.setContent("Your instrument has crushed.");
			break;
		default:
			goog.asserts.assertTrue(falsej, 'Invalid publish status');
	}

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

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._getDirectoryControl = function(){
	return new synthjs.ui.DirectoryControl(this._fileSystem);
};


/**
 * Save active window on local file system.
 */
synthjs.application.SDKOscillator.prototype.saveActiveWindow = function(){
	var win = this._windowHolder.getActiveWindow();
	if( win instanceof synthjs.ui.window.Code && win.isChanged() ){
		var newContent = win.getEditedCode();
		var file = win.getFile();
		file.set("content", newContent);
	}
};

/**
 * Set keyboard shortcut
 * @override
 */
synthjs.application.SDKOscillator.prototype.onPressKey = function(e){
	if( e.ctrlKey && "S"==String.fromCharCode(e.keyCode) ){
		e.preventDefault();
		this.saveActiveWindow();
	}
};

/**
 * post all file to server
 */
synthjs.application.SDKOscillator.prototype.postAllDeferred = function(){
	return this.getApi().postPluginFilesDeferred(this._fileSystem);
};



synthjs.application.SDKOscillator.prototype.onPostAll = function(){
	this.postAllDeferred().callback();
};


/**
 *  @override
 */
synthjs.application.SDKOscillator.prototype.onDebugRun = function(){
	this.closeOscillator();
	this.postAllDeferred()
		.addCallback(goog.bind(this.launchOscillator, this))
		.callback();

};

synthjs.application.SDKOscillator.prototype.launchOscillator = function(){
	goog.base(this, 'launchOscillator');
};

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._onOscillatorError = function(e){
	goog.base(this, "_onOscillatorError", e);
	this._publishStatus = synthjs.application.SDKOscillator.StatusType.ERROR;
};

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._onOscillatorInit = function(e){
	goog.base(this, "_onOscillatorInit", e);
	this._publishStatus = synthjs.application.SDKOscillator.StatusType.SUCCESS;
};

synthjs.application.SDKOscillator.StatusType = {
	INITIAL: 'initial',
	SUCCESS: 'success',
	ERROR: 'error'
};

window['SDKOscillator'] = synthjs.application.SDKOscillator;

