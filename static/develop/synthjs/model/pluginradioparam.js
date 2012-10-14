goog.provide("synthjs.model.PluginRadioParam");

goog.require("synthjs.model.Base");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 */
synthjs.model.PluginRadioParam = function(
		name, value, width, height, offsets, imagepathOn, imagepathOff){
	goog.base(this, {
		"name": name,
		"value": value,
		"width": width,
		"height": height,
		"offsets": offsets,
		"imagepathOn": imagepathOn,
		"imagepathOff": imagepathOff
	});
}

goog.inherits(synthjs.model.PluginRadioParam, synthjs.model.Base);

/**
 * @override
 */
synthjs.model.PluginRadioParam.prototype.set = function(name, value){
	if( name=='value' ){
		value = value % this.get("offsets").length;
	}
	goog.base(this, 'set', name, value);
}
