goog.provide("synthjs.utility.BlobBuilder");

/**
 * FileAPIのBlobBuilderのラッパー。クロスブラウザ機能
 * 
 * @constructor
 */
synthjs.utility.BlobBuilder = function(opt_urlObject, opt_blobBuilder){
	opt_urlObject = opt_urlObject || (window['URL'] || window['webkitURL']);
	opt_blobBuilder = opt_blobBuilder || (window['MozBlobBuilder'] || window['WebKitBlobBuilder']);
	
	if( !opt_urlObject || !opt_blobBuilder ){
		throw new Error("BlobBuilder is not available.");
	}
	
	/**
	 * @private
	 */
	this._builder = new opt_blobBuilder();
	
	/**
	 * @private
	 */
	this._urlObject = opt_urlObject;
};

// synthjs.utility.BlobBuilder.create = function(window){
// 	
	// var builder = window['MozBlobBuilder'] || window['WebKitBlobBuilder'];
	// var urlObject = window['URL'] || window['webkitURL'];
// 	
	// if( builder && urlObject ){
		// return new synthjs.utility.BlobBuilder(urlObject, new builder());
	// }
	// else {
		// return false;
	// }
// };

synthjs.utility.BlobBuilder.prototype.append = function(data){
	return this._builder["append"](data);
};

synthjs.utility.BlobBuilder.prototype.createURL = function(){
	return this._urlObject["createObjectURL"](this._builder['getBlob']());
};

synthjs.utility.BlobBuilder.prototype.getBlob = function(mimetype){
	return this._builder["getBlob"](mimetype);
}
