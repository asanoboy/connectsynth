goog.provide("synthjs.net.PluginPoster");

goog.require("goog.array");
goog.require("synthjs.utility.AjaxDeferred");
/**
 * @constructor
 * @param {goog.Uri} api: url
 */
synthjs.net.PluginPoster = function(api){
	
	/**
	 * @type {goog.Uri}
	 */
	this._apiUri = api;
	this._fileList = [];
};

/**
 * @param {synthjs.model.File} name
 * @param {string|Blob} file
 */
synthjs.net.PluginPoster.prototype.addFile = function(name, file){
	if( this.isContained(name) ) throw new Error("PluginPoster can't have duplicate files.");
	this._fileList.push([name, file]);
};

synthjs.net.PluginPoster.prototype.isContained = function(name){
	return goog.array.find(this._fileList, function(info){
		return info[0] == name;
	}, this) ? true : false
} ;

synthjs.net.PluginPoster.prototype.getRequestDeferred = function(){
	var fd = new FormData();
	goog.array.forEach(this._fileList, function(info){
		fd.append(info[0], info[1], info[0]);
		//data[info[0]] = info[1];
	});
	return new synthjs.utility.AjaxDeferred(this._apiUri.toString(), {
		data: fd,
		method: 'post',
		_contentType: null,
		success: function(rt){
			if( rt.getResponseText()=="ok" ){
				
			}
			else {
				// File size too big.
			}
		}
	});
}

/**
 * @param {array}
 */
//synthjs.net.PluginPoster.prototype._fileList = [];

/**
 * @param {string}
 */
synthjs.net.PluginPoster.prototype._apiUri = null;