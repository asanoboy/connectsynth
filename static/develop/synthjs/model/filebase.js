goog.provide("synthjs.model.FileBase");
goog.provide("synthjs.model.FileType");

goog.require("synthjs.model.Base");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 * @param {string} filename
 * @param {synthjs.model.FileType} type
 * @param {false|string} content
 */
synthjs.model.FileBase = function(filename, type, content){
	goog.base(this, {
		"filename": filename,
		"type": type,
		"content": content
	});
}
goog.inherits(synthjs.model.FileBase, synthjs.model.Base);


synthjs.model.FileType = {
	TEXT: 'filetype-text',
	DIRECTORY: 'filetype-dir',
	IMAGE: 'filetype-image',
	BINARY: 'filetype-binary'
};
