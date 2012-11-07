goog.provide("synthjs.model.Directory");

goog.require("synthjs.model.FileBase");

/**
 * @constructor
 * @extends{synthjs.model.FileBase}
 */
synthjs.model.Directory = function(dirname){
	goog.base(this, dirname, synthjs.model.FileType.DIRECTORY, null);
}

goog.inherits(synthjs.model.Directory, synthjs.model.FileBase);

/**
 * @override
 */
synthjs.model.Directory.prototype.get = function(attr){
	if( attr=='content' ){
		throw new Error("Directory has not content");
	}
	return goog.base(this, 'get', attr);
}

/**
 * @override
 */
synthjs.model.Directory.prototype.set_ = function(attr, value){
	if( attr=='content' ){
		throw new Error("Directory has not content");
	}
	return goog.base(this, 'set_', attr, value);
}

