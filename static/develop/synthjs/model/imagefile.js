goog.provide("synthjs.model.ImageFile");

goog.require("goog.asserts");
goog.require("synthjs.model.FileType");
goog.require("synthjs.model.FileBase");

/**
 * @constructor
 * @extends{synthjs.model.FileBase}
 * @param {Blob} file
 */
synthjs.model.ImageFile = function(filename, file){
	goog.base(this, 
		filename, 
		synthjs.model.FileType.IMAGE, 
		file
	);
}

goog.inherits(synthjs.model.ImageFile, synthjs.model.FileBase);

synthjs.model.ImageFile.prototype.getDataUrl = function(){
	var urlObject = window['URL'] || window['webkitURL'];
	
	goog.asserts.assert(urlObject);
	return urlObject["createObjectURL"](this.get('content'));
}