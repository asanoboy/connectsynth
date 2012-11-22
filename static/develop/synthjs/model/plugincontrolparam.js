goog.provide("synthjs.model.PluginControlParam");

goog.require("synthjs.model.Base");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 * @param {string} name
 * @param {number} value
 */
synthjs.model.PluginControlParam = function(
		name, value, min, max, step, width, height, offsetX, offsetY, imagepath, 
		labelEnabled, labelPosition, labelPrefix, labelPostfix, labelOffsetX, labelOffsetY){
	
	switch(labelPosition){
		case "top": case "right": case "bottom": case "left":
			labelPosition = labelPosition;
			break;
		default:
			labelPosition = "top";
			break;
	}
	goog.isNumber(labelOffsetX) || (labelOffsetX=0);
	goog.isNumber(labelOffsetY) || (labelOffsetY=0);
	
	goog.base(this, {
		"name": name,
		"value": value,
		"internalValue": value,
		"min": min,
		"max": max,
		"step": step,
		"width": width,
		"height": height,
		"offsetX": offsetX,
		"offsetY": offsetY,
		"imagepath": imagepath,
		"labelEnabled": labelEnabled,
		"labelPosition": labelPosition,
		"labelPrefix": labelPrefix,
		"labelPostfix": labelPostfix,
		"labelOffsetX": labelOffsetX,
		"labelOffsetY": labelOffsetY
	});
}

goog.inherits(synthjs.model.PluginControlParam, synthjs.model.Base);

/**
 * This method limits value from 0 to 1 when name is 'value'.
 * @override
 */
synthjs.model.PluginControlParam.prototype.set = function(name, value){
	if( name=='value' ){
		value = Math.max(this.get("min"), value);
		value = Math.min(this.get("max"), value);
		
		this.set("internalValue", value);
		value = parseInt(value/this.get("step"))*this.get("step");
	}
	goog.base(this, 'set', name, value);
}
