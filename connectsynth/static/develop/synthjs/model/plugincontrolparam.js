goog.provide("synthjs.model.PluginControlParam");

goog.require("synthjs.model.Base");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 */
synthjs.model.PluginControlParam = function(
		name, value, width, height, offsetX, offsetY, imagepath){
	goog.base(this, {
		"name": name,
		"value": value,
		"width": width,
		"height": height,
		"offsetX": offsetX,
		"offsetY": offsetY,
		"imagepath": imagepath
	});
}

goog.inherits(synthjs.model.PluginControlParam, synthjs.model.Base);

/**
 * This method limits value from 0 to 1 when name is 'value'.
 * @override
 */
synthjs.model.PluginControlParam.prototype.set = function(name, value){
	if( name=='value' ){
		value = Math.max(0, value);
		value = Math.min(1, value);
	}
	goog.base(this, 'set', name, value);
}
