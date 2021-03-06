goog.provide("synthjs.application.PublicOscillator");

goog.require("synthjs.application.OscillatorBase");

goog.require("synthjs.ui.DirectoryControl");
goog.require("synthjs.ui.Dialog");
goog.require("synthjs.utility.TwitterUri");
goog.require("goog.string");

/**
 * @constructor
 * @extends {synthjs.application.OscillatorBase}
 */
synthjs.application.PublicOscillator = function(id, params){

	// this._extendUri = new goog.Uri(params['extendapi']);
	this._isOwner = goog.isNull(params['isOwner']) ? false : !!params['isOwner'];
	goog.base(this, id, params);

	this.launchOscillator();
	this._setIsOscillatorEditable(false);
};

goog.inherits(synthjs.application.PublicOscillator, synthjs.application.OscillatorBase);

/**
 * @override
 */
synthjs.application.PublicOscillator.prototype._getDirectoryControl = function(){
	return new synthjs.ui.DirectoryControl(this._fileSystem, editable=false);
};

/**
 * @override
 */
synthjs.application.PublicOscillator.prototype._getMenuComponent = function(){
	var arr = [
				{label:"Instrument: "+this._oscillatorName, sublist: [
					{label:'Embed', callback: goog.bind(this.onShowEmbed, this)},
					{label:'Fork', callback: goog.bind(this.onExtendOscillator, this)},
					{label:'About', callback: goog.bind(this.onShowInformation, this)}
				]}
			];
	if( this._isOwner ){
		arr.push(
			{label:"AdminOnly", sublist: [
				{label:'Edit Description', callback: goog.bind(this.onEditDescription, this)},
				{label:'Delete', callback: goog.bind(this.onDeletePlugin, this)}
			]}
		);
	}
	else {
		arr.push(
			{label:"AdminOnly", sublist: [
				{label:'Edit Description'},
				{label:'Delete'}
			]}
		);
	}

	return synthjs.ui.MenuBar.createFromSetting(arr);
};

/**
 * Assume the caller is the owner of plugin.  
 */
synthjs.application.PublicOscillator.prototype.onEditDescription = function(){

	this.getApi()
		.getDescriptionDeferred()
		.addCallbacks(goog.bind(function(rt){
			if( rt.isSuccess() ){
				var dialog = new synthjs.ui.Dialog(null, false);
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
				dialog.setTitle("Edit Description");
				var dom = goog.dom;
				var hoge = dom.createDom("textarea", {"rows":10, "cols":80}, rt.data);
				dialog.setContentElement(hoge);
				this.getHandler()
					.listen(
						dialog,
						goog.ui.Dialog.EventType.SELECT,
						function(e){
							if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
								this.updateDescription(hoge.value);
							}
							this.getHandler().unlisten(dialog);
						}
					);
				dialog.setVisible(true);
			}
			else {
				alert("Error occurred");
			}
		}, this))
		.callback();

	return;
};

/**
 * @param {string} description
 */
synthjs.application.PublicOscillator.prototype.updateDescription = function(description){

	this.getApi()
		.updateDescriptionDeferred(description)
		.addCallbacks(function(rt){
			if( rt.isSuccess() ){
				synthjs.ui.Dialog.alertOK("Success", "Description was updated.");
			}
		})
		.callback();
	return;

};


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
		);
	dialog.setVisible(true);
};

synthjs.application.PublicOscillator.prototype.deletePlugin = function(){

	this.getApi().deleteDeferred()
		.addCallbacks(goog.bind(function(r){
			if( r.isSuccess() ){
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
		}, this))
		.callback();
	return;
};


synthjs.application.PublicOscillator.prototype.onExtendOscillator = function(){
	var dialog = new goog.ui.Dialog(null, false);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
	dialog.setTitle("Attention");
	dialog.setContent("Do you overwrite your workspace with this instrument?");
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
		);
	dialog.setVisible(true);
};

synthjs.application.PublicOscillator.prototype.postExtendOscillator = function(){
	this.getApi().fetchDeferred()
		.addCallbacks(goog.bind(function(r){
			var dialog;
			if( r.isSuccess() ){
				dialog = new goog.ui.Dialog(null, false);
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
				dialog.setTitle("Success to copy plugin.");
				dialog.setContent("Do you move to your workspace?");
				this.getHandler().listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
							document.location = r.data.next;
						}
						this.getHandler().unlisten(dialog);
					}
				);
				dialog.setVisible(true);
			}
			else if( r.data.status=='signout' ){
				dialog = new goog.ui.Dialog(null, false);
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
				dialog.setTitle("Required to sign in.");
				dialog.setContent("Do you sign in using Twitter account?");
				this.getHandler().listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						if( e.key == goog.ui.Dialog.DefaultButtonKeys.OK ){
							document.location = r.data.next+"?next="+escape(document.location+"");
						}
						this.getHandler().unlisten(dialog);
					}
				);
				dialog.setVisible(true);
			}
			else {
				alert("error ocurred.");
			}
		}, this))
		.callback();
	return;
};

synthjs.application.PublicOscillator.prototype.onShowEmbed = function(){
	var module = this.getOscillatorModule(),
		width = module.getWidth() + 117, // A width of the vertical keyboard is 117px.
		height = module.getHeight();

	var iframe = "<iframe src='"+document.location.origin + this.getApi().getEmbedUri().toString()+"' width='"+width+"' height='"+height+"'></iframe>",
		input = "<input value="+goog.string.quote(iframe)+" style='width:"+width+"px;'></input>",
		html = iframe + "<br/>" + input;

	synthjs.ui.Dialog.alertOK("Embed", html);
};

synthjs.application.PublicOscillator.prototype.onShowInformation = function(){
	this.getApi().getPublicInformationDeferred()
		.addCallbacks(function(r){
			if( r.isSuccess() ){

				var desc = goog.string.htmlEscape(r.data.description);
				desc = desc.split("\n").join("<br/>");
				var contentHtml = "<p>"+desc+"</p><br/><br/>";
				contentHtml += "<div>";
				contentHtml += "<p style='text-align: right;'>created by <a href='"+
					synthjs.utility.TwitterUri.createByScreenName(r.data.screen_name)+
					"' target='_blank'>"+r.data.screen_name+"</a></p>";
				contentHtml += "</div>";
				synthjs.ui.Dialog.alertOK("Information", contentHtml);
			}
			else {
				alert("error");
			}
		})
		.callback();
	return;
};

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
};

window['PublicOscillator'] = synthjs.application.PublicOscillator;