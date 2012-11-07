goog.provide("synthjs.application.PublicOscillator");

goog.require("synthjs.application.SDKOscillatorBase");
goog.require("synthjs.ui.DirectoryControl");
goog.require("synthjs.utility.AjaxDeferred");
/**
 * @constructor
 * @extends {synthjs.application.SDKOscillatorBase}
 */
synthjs.application.PublicOscillator = function(id, params){
	
	this._extendUri = new goog.Uri(params['extendapi']);
	this._isOwner = goog.isNull(params['isOwner']) ? false : !!params['isOwner']; 
	goog.base(this, id, params);
	this.launchOscillator();
}

goog.inherits(synthjs.application.PublicOscillator, synthjs.application.SDKOscillatorBase);

/**
 * @override
 */
synthjs.application.PublicOscillator.prototype._getDirectoryControl = function(){
	return new synthjs.ui.DirectoryControl(this._fileSystem, editable=false);
}

/**
 * @override
 */
synthjs.application.PublicOscillator.prototype._getMenuComponent = function(){
	var arr = [
				{label:this._oscillatorName, sublist: [
					{label:'Launch', callback: goog.bind(this.launchOscillator, this)},
					{label:'Copy To Workspace', callback: goog.bind(this.onExtendOscillator, this)},
					{label:'About', callback: goog.bind(this.onShowInformation, this)}
				]}
			];
	if( this._isOwner ){
		arr.push(
			{label:"Admin", sublist: [
				{label:'Edit Description', callback: goog.bind(this.onEditDescription, this)},
				{label:'Delete', callback: goog.bind(this.onDeletePlugin, this)}
			]}
		);
	}
	else {
		arr.push(
			{label:"Admin", sublist: [
				{label:'Edit Description'},
				{label:'Delete'}
			]}
		);
	}
	
	return synthjs.ui.MenuBar.createFromSetting(arr);
}

/**
 * Assume the caller is the owner of plugin.  
 */
synthjs.application.PublicOscillator.prototype.onEditDescription = function(){
	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
	dialog.setTitle("Attention");
	dialog.setContent("Do you delete this plugin?");
			
	this.getHandler()
		.listen(
			dialog,
			goog.ui.Dialog.EventType.SELECT,
			function(e){
				if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
					this.deletePlugin();
				}
				this.getHandler().unlisten(dialog);
			}
		)
	dialog.setVisible(true);
}

/**
 * Assume the caller is the owner of plugin.  
 */
synthjs.application.PublicOscillator.prototype.onDeletePlugin = function(){
	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
	dialog.setTitle("Attention");
	dialog.setContent("Do you delete this plugin?");
			
	this.getHandler()
		.listen(
			dialog,
			goog.ui.Dialog.EventType.SELECT,
			function(e){
				if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
					this.deletePlugin();
				}
				this.getHandler().unlisten(dialog);
			}
		)
	dialog.setVisible(true);
}

synthjs.application.PublicOscillator.prototype.deletePlugin = function(){
	new synthjs.utility.AjaxDeferred(this.getApi().deletePlugin().toString(), {
		responseType: goog.net.XhrIo.ResponseType.TEXT,
		success: function(r){
			// TODO: Error handling
			var rt = r.getResponseJson();
			if( rt['status']=='ok' ){
				var dialog = new goog.ui.Dialog(null, false);
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
				dialog.setTitle("Success to delete plugin.");
				dialog.setContent("Move to the top page.");
				this.getHandler().listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						document.location = "/"; 
					}
				);
				dialog.setVisible(true);
			}
			else {
				alert("Error occurred.");
			}
		}
	}, this).callback();
};


synthjs.application.PublicOscillator.prototype.onExtendOscillator = function(){
	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
	dialog.setTitle("Attention");
	dialog.setContent("This action intends to copy this plugin to your workspace. If your plugin exists in the workspace, it will be overwrited.");
	//dialog.setContent("This action requires you to sign in. Have you already signed in?");
			
	this.getHandler()
		.listen(
			dialog,
			goog.ui.Dialog.EventType.SELECT,
			function(e){
				if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
					this.postExtendOscillator();
				}
				this.getHandler().unlisten(dialog);
			}
		)
	dialog.setVisible(true);
}

synthjs.application.PublicOscillator.prototype.postExtendOscillator = function(){
	//new synthjs.utility.AjaxDeferred(this._extendUri.toString(), {
	new synthjs.utility.AjaxDeferred(this.getApi().copyPlugin().toString(), {
		responseType: goog.net.XhrIo.ResponseType.TEXT,
		success: function(r){
			var rt = r.getResponseJson();
			if( rt['status']=='ok' ){
				var dialog = new goog.ui.Dialog(null, false);
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
				dialog.setTitle("Success to copy plugin.");
				dialog.setContent("Do you move to your workspace?");
				this.getHandler().listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
							document.location = rt['next']; 
						}
						this.getHandler().unlisten(dialog);
					}
				);
				dialog.setVisible(true);
			}
			else if( rt['status']=='signout' ){
				var dialog = new goog.ui.Dialog(null, false);
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
				dialog.setTitle("Required to sign in.");
				dialog.setContent("Do you sign in using Twitter account?");
				this.getHandler().listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
							document.location = rt['next']+"?re="+escape(document.location); 
						}
						this.getHandler().unlisten(dialog);
					}
				);
				dialog.setVisible(true);
			}
		}
	}, this).callback();
	//document.location = this._extendUri.toString();
}

synthjs.application.PublicOscillator.prototype.onShowInformation = function(){
	
}

/**
 * @override
 */
synthjs.application.PublicOscillator.prototype.onDirectoryNodeSelect = function(e){
	switch(e.target.get("type")){
		case synthjs.model.FileType.TEXT:
			this._windowHolder.addWindow( new synthjs.ui.window.Code(e.target, {editable:false }) );
			break;
		case synthjs.model.FileType.IMAGE:
			this._windowHolder.addWindow( new synthjs.ui.window.Image(e.target) );
			break;
		
	}
}

/**
 * @override 
 */
synthjs.application.PublicOscillator.prototype.createOscillatorInternal = function(){
	//return new synthjs.application.module.Oscillator(new goog.Uri(this._bootstrapJs), false);
	return new synthjs.application.module.Oscillator(this.getApi(), false);
}


window['PublicOscillator'] = synthjs.application.PublicOscillator;