goog.provide("synthjs.model.PluginParam");

goog.require("synthjs.model.Base");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 */
synthjs.model.PluginParam = function(
		name, value, type, width, height, offsetX, offsetY, imagepath){
	goog.base(this, {
		"name": name,
		"value": value,
		"type": type,
		"width": width,
		"height": height,
		"offsetX": offsetX,
		"offsetY": offsetY,
		"imagepath": imagepath
	});
}

goog.inherits(synthjs.model.PluginParam, synthjs.model.Base);

/**
 * @override
 */
synthjs.model.PluginParam.prototype.set = function(name, value){
	if( name=='value' ){
		value = Math.max(0, value);
		value = Math.min(1, value);
	}
	goog.base(this, 'set', name, value);
}
