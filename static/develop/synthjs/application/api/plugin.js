goog.provide("synthjs.application.api.Plugin");

goog.require("goog.Uri");

/**
 * @constructor
 * @param {string} pluginCode
 */
synthjs.application.api.Plugin = function(pluginCode){
	this._pluginCode = pluginCode;
	this._baseUri = new goog.Uri("/app/");
};

synthjs.application.api.Plugin.prototype.copyPlugin = function(){
	return this._baseUri.resolve(new goog.Uri("workspace/extend_instrument/"+this._pluginCode+"/"));
}
synthjs.application.api.Plugin.prototype.publishPlugin = function(){
	return this._baseUri.resolve(new goog.Uri("workspace/publish/"+this._pluginCode+"/"));
}
synthjs.application.api.Plugin.prototype.deletePlugin = function(){
	return this._baseUri.resolve(new goog.Uri("plugin/delete/"+this._pluginCode+"/"));
}
synthjs.application.api.Plugin.prototype.updateDescription = function(){
	return this._baseUri.resolve(new goog.Uri("plugin/description/"+this._pluginCode+"/"));
}


/**
 * @param {string} name
 * @return {goog.Uri}
 */
synthjs.application.api.Plugin.prototype.getFile = function(path){
	return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"+path));
}
synthjs.application.api.Plugin.prototype.getFileList = function(){
	return this._baseUri.resolve(new goog.Uri("plugin/filelist/"+this._pluginCode+"/"));	
}
synthjs.application.api.Plugin.prototype.postFile = function(){
	return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"));
}
synthjs.application.api.Plugin.prototype.deleteFile = function(){
	return this.postFile();
}
synthjs.application.api.Plugin.prototype.getDescription = function(){
	return this.updateDescription();
}
synthjs.application.api.Plugin.prototype.getInformation = function(){
	return this._baseUri.resolve(new goog.Uri("plugin/information/"+this._pluginCode+"/"));
}


synthjs.application.api.Plugin.prototype.postPreset = function(){
	return this._baseUri.resolve(new goog.Uri("preset/post/"+this._pluginCode+"/"));
}
synthjs.application.api.Plugin.prototype.deletePreset = function(){
	return this._baseUri.resolve(new goog.Uri("preset/delete/"+this._pluginCode+"/"));
}
synthjs.application.api.Plugin.prototype.getPresetList = function(){
	return this._baseUri.resolve(new goog.Uri("preset/list/"+this._pluginCode+"/"));
}


