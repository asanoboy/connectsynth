goog.provide("synthjs.encode.BlobBuilder");

/**
 * FileAPIのBlobBuilderのラッパー。クロスブラウザ機能
 * 
 * @constructor
 * @private
 */
synthjs.encode.BlobBuilder = function(urlObject, blobBuilder){
	/**
	 * @private
	 */
	this._builder = blobBuilder;
	
	/**
	 * @private
	 */
	this._urlObject = urlObject;
};

synthjs.encode.BlobBuilder.create = function(window){
	
	var builder = window['MozBlobBuilder'] || window['WebKitBlobBuilder'];
	var urlObject = window['URL'] || window['webkitURL'];
	
	if( builder && urlObject ){
		return new synthjs.encode.BlobBuilder(urlObject, new builder());
	}
	else {
		return false;
	}
};

synthjs.encode.BlobBuilder.prototype.append = function(data){
	return this._builder.append(data);
};

synthjs.encode.BlobBuilder.prototype.createURL = function(){
	return this._urlObject["createObjectURL"](this._builder['getBlob']());
};
