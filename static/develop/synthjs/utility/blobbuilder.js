goog.provide("synthjs.utility.BlobBuilder");

/**
 * FileAPIのBlobBuilderのラッパー。クロスブラウザ機能
 * 
 * @constructor
 */
synthjs.utility.BlobBuilder = function(opt_urlObject, opt_blobBuilder){
	opt_urlObject = opt_urlObject || (window['URL'] || window['webkitURL']);
	opt_blobBuilder = opt_blobBuilder || (window['MozBlobBuilder'] || window['WebKitBlobBuilder']);

	if( !opt_blobBuilder && window['Blob'] ){
		opt_blobBuilder = synthjs.utility.SimpleBlobBuilder;
	}
	
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

synthjs.utility.BlobBuilder.prototype.append = function(data){
	return this._builder["append"](data);
};

synthjs.utility.BlobBuilder.prototype.createURL = function(){
	return this._urlObject["createObjectURL"](this._builder['getBlob']());
};

synthjs.utility.BlobBuilder.prototype.getBlob = function(mimetype){
	return this._builder["getBlob"](mimetype);
}

/**
 * @constructor
 */
synthjs.utility.SimpleBlobBuilder = function(){
	this._buffers = [];
}

synthjs.utility.SimpleBlobBuilder.prototype["append"] = function(buffer){
	this._buffers.push(buffer);
}

synthjs.utility.SimpleBlobBuilder.prototype["getBlob"] = function(mimetype){
	if ( !window["Blob"] ){
		goog.asserts.assert("Blob is not available.");
	}
	return new Blob(this._buffers, {"type": mimetype});
}