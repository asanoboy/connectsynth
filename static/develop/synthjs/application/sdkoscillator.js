goog.provide("synthjs.application.SDKOscillator");

goog.require("synthjs.application.SDKOscillatorBase");

goog.require("synthjs.application.OscillatorPlayer");
goog.require("synthjs.ui.DirectoryControl");

goog.require("synthjs.model.Collection");
goog.require("synthjs.model.FileSystem");
goog.require("synthjs.model.TextFile");
goog.require("synthjs.net.PluginPoster");
goog.require("synthjs.utility.BlobBuilder");
goog.require("synthjs.utility.AjaxDeferred");
goog.require("goog.ui.Prompt");
goog.require("goog.ui.Dialog");
goog.require("goog.ui.Dialog.ButtonSet");

/**
 * @constructor
 * @extends {synthjs.application.SDKOscillatorBase}
 */
synthjs.application.SDKOscillator = function(id, params){
	
	this._publishStatus = synthjs.application.SDKOscillator.StatusType.INITIAL;
	
	this._publishUri = new goog.Uri(params['publishapi']);
	goog.base(this, id, params);
}

goog.inherits(synthjs.application.SDKOscillator, synthjs.application.SDKOscillatorBase);

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._getMenuComponent = function(){
	return synthjs.ui.MenuBar.createFromSetting(
		[
			{label:"Workspace", sublist: [
				{label:'Launch', callback: goog.bind(this.onDebugRun, this)},
				{label:'Publish', callback: goog.bind(this.onPublish, this)}
			]}
		]
	); 
}

synthjs.application.SDKOscillator.prototype.onPublish = function(){
	switch( this._publishStatus ){
		case synthjs.application.SDKOscillator.StatusType.SUCCESS:
			this._showPublishPrompt();
			break;
		default:
			this._showPublishAlertPrompt();
			break;
	}
}

synthjs.application.SDKOscillator.prototype._showPublishPrompt = function(){
	var prompt = new goog.ui.Prompt("Input your instrument name", "Instrument Name:", goog.bind(function(name){
		new synthjs.utility.AjaxDeferred(this._publishUri.toString(), {
			data: {'name': name, "description": name},
			method: 'post',
			responseType: goog.net.XhrIo.ResponseType.TEXT,
			success: function(r){
				var rt = r.getResponseJson();
				if( rt['status']=='ok' && rt['next'] ){
					document.location = rt['next'];
				}
				else{
					alert("Error Occurred!");
				}
			},
			error: function(e){
				alert("Error Ocurred!");
			}
		}).callback();
		return false;
	}, this));
	
	prompt.setVisible(true);
}

synthjs.application.SDKOscillator.prototype._showPublishAlertPrompt = function(){
	
	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
	
	switch( this._publishStatus ){
		case synthjs.application.SDKOscillator.StatusType.INITIAL:
			dialog.setTitle("Attention");
			dialog.setContent("First launch your instrument from the menu.");
			break;
		case synthjs.application.SDKOscillator.StatusType.ERROR:
			dialog.setTitle("Attention");
			dialog.setContent("Your instrument has crushed. Please review it.");
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
		)
	dialog.setVisible(true);
}

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._getDirectoryControl = function(){
	return new synthjs.ui.DirectoryControl(this._fileSystem);
}


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
}

/**
 * Set keyboard shortcut
 * @override
 */
synthjs.application.SDKOscillator.prototype.onPressKey = function(e){
	if( e.ctrlKey && "S"==String.fromCharCode(e.keyCode) ){
		e.preventDefault();
		this.saveActiveWindow();
	}
}

/**
 * post all file to server
 */
synthjs.application.SDKOscillator.prototype.postAllDeferred = function(){
	
	var pluginPoster = new synthjs.net.PluginPoster(this._apiUri);
	goog.array.forEach(this._fileSystem.getAllFiles(), function(file){
		switch(file.get("type")){
			case synthjs.model.FileType.TEXT:
				var bb = new synthjs.utility.BlobBuilder();
				bb.append(file.get('content'));
				pluginPoster.addFile(this._fileSystem.getPath(file).join("/"), bb.getBlob("text/plain"));
				break;
			case synthjs.model.FileType.IMAGE:
				
				pluginPoster.addFile(this._fileSystem.getPath(file).join("/"), file.get("content"));
				break;
		}
		
	}, this);
	
	return pluginPoster.getRequestDeferred();
}


/**
 * post a specific file to server 
 * @param {synthjs.model.File} file
 */
synthjs.application.SDKOscillator.prototype.saveDeferred = function(file){
	var pluginPoster = new synthjs.net.PluginPoster(this._apiUri);
	var bb = new synthjs.utility.BlobBuilder();
	bb.append(file.get('content'));
	pluginPoster.addFile(file.get('filename'), bb.getBlob("text/plain"));
	return pluginPoster.getRequestDeferred();
};


synthjs.application.SDKOscillator.prototype.onPostAll = function(){
	this.postAllDeferred().callback();
}


/**
 *  @override
 */
synthjs.application.SDKOscillator.prototype.onDebugRun = function(){
	this.closeOscillator();
	this.postAllDeferred()
		.addCallback(goog.bind(this.launchOscillator, this))
		.callback();

}

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._onOscillatorError = function(e){
	goog.base(this, "_onOscillatorError", e);
	this._publishStatus = synthjs.application.SDKOscillator.StatusType.ERROR;
}

/**
 * @override
 */
synthjs.application.SDKOscillator.prototype._onOscillatorInit = function(e){
	goog.base(this, "_onOscillatorInit", e);	
	this._publishStatus = synthjs.application.SDKOscillator.StatusType.SUCCESS;
}

synthjs.application.SDKOscillator.StatusType = {
	INITIAL: 'initial',
	SUCCESS: 'success',
	ERROR: 'error'
}

window['SDKOscillator'] = synthjs.application.SDKOscillator;
