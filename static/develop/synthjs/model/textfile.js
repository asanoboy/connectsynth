goog.provide("synthjs.model.TextFile");

goog.require("synthjs.model.FileType");
goog.require("synthjs.model.FileBase");

/**
 * @constructor
 * @extends{synthjs.model.FileBase}
 */
synthjs.model.TextFile = function(filename, content){
	goog.base(this, 
		filename, 
		synthjs.model.FileType.TEXT, 
		content.replace(/\r/g, "") // '\n' only to match codemirror
	);
}

goog.inherits(synthjs.model.TextFile, synthjs.model.FileBase);

