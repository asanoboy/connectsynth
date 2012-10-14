goog.provide("synthjs.model.PluginToggleParam");

goog.require("synthjs.model.Base");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 */
synthjs.model.PluginToggleParam = function(
		name, value, width, height, offsetX, offsetY, imagepathOn, imagepathOff){
	
	value = value ? 1 : 0;
	goog.base(this, {
		"name": name,
		"value": value,
		"width": width,
		"height": height,
		"offsetX": offsetX,
		"offsetY": offsetY,
		"imagepathOn": imagepathOn,
		"imagepathOff": imagepathOff
	});
}

goog.inherits(synthjs.model.PluginToggleParam, synthjs.model.Base);

/**
 * @override
 */
synthjs.model.PluginToggleParam.prototype.set = function(name, value){
	if( name=='value' ){
		value = value ? 1 : 0;
	}
	goog.base(this, 'set', name, value);
}
