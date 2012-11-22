goog.provide("synthjs.ui.graphics.ControlButton");

goog.require("synthjs.ui.graphics.GraphicsComponent");
goog.require("goog.graphics.ext");
goog.require("goog.string.format");

/**
 * This class is component of rotating control.
 * @constructor
 * @extends {synthjs.ui.graphics.GraphicsComponent}
 * @param {synthjs.model.PluginControlParam} param
 * @param {goog.graphics.AbstractGraphics} graphics
 */
synthjs.ui.graphics.ControlButton = function(param, grahpics, opt_domHelper){
	goog.base(this, opt_domHelper);
	this._param = param;
	this._mid = (this._param.get("max") + this._param.get("min")) / 2;
	this._range = this._param.get("max") - this._param.get("min");
	
}

goog.inherits(synthjs.ui.graphics.ControlButton, synthjs.ui.graphics.GraphicsComponent);

/**
 * @override
 */
synthjs.ui.graphics.ControlButton.prototype.decorateInternal = function(gr){
	goog.base(this, "decorateInternal", gr);
	
	var width = this._param.get("width"),
		height = this._param.get("height"),
		offsetX = this._param.get("offsetX"),
		offsetY = this._param.get("offsetY"),
		imagepath = this._param.get("imagepath"),
		value = this._param.get("value"),
		step = this._param.get("step"),
		labelEnabled = this._param.get("labelEnabled");	
	
	
	this._centerX = offsetX;
	this._centerY = offsetY;
	
	var group = gr.createGroup();
	group.setSize(width+'px', height+'px');
	
	// Put the center of the image on coordinate of (offsetX, offsetY)
	var image = gr.drawImage(offsetX-width/2, offsetY-height/2, width, height, imagepath);

	if( labelEnabled ){
		
		var labelPosition = this._param.get("labelPosition");
		this._labelPrefix = this._param.get("labelPrefix");
		this._labelPostfix = this._param.get("labelPostfix");
		
		var tmp = step;
		this._dispDigit = 0;
		while( true ){
			tmp *= 10;
			if( this._dispDigit>=4 || tmp%10 == 0 ){
				break;
			}		
			this._dispDigit++;
		}
		this._textElement = this.getGraphics().drawText('', offsetX, offsetY-height, 0, 0, 'center', null,
	          new goog.graphics.Font(15, 'Times'), null, new goog.graphics.SolidFill('#000'));
	}
	
	this._controlImage = image;
	this._group = group;
}

/**
 * @override
 */
synthjs.ui.graphics.ControlButton.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	
	this._setValue(this._param.get("value"));
	
	this.getHandler()
		.listen(
			this._controlImage,
			goog.events.EventType.MOUSEDOWN,
			this._onMouseDown)
		.listen(
			this._param,
			synthjs.model.EventType.CHANGE,
			this._onModelChange
		)
}

/**
 * @param {number} value [0, 1]
 * @return {number} radisu[]
 */
synthjs.ui.graphics.ControlButton.prototype._getRadius = function(value){
	return (value-this._mid)/this._range*270;
}

/**
 * @param {number} value [0, 1]
 * @return {number} radisu[]
 */
synthjs.ui.graphics.ControlButton.prototype._setValue = function(value){
	var radius = this._getRadius(value);
	this._controlImage.setTransformation(0,0,radius,this._centerX, this._centerY,0);
	if( this._textElement ){
		var label = "";
		if( this._labelPrefix ){
			label += this._labelPrefix;
		}
		label += goog.string.format("%."+this._dispDigit+"f", value);
		
		if( this._labelPostfix ){
			label += this._labelPostfix;
		}
		
		this._textElement.setText(label);
	}
}

/**
 * @param {number} value [0,1]
 */
synthjs.ui.graphics.ControlButton.prototype._onModelChange = function(e){
	this._setValue(e.target.after);
}

synthjs.ui.graphics.ControlButton.prototype._onMouseDown = function(e){
	
	this.getHandler()
		.listen(
			this.getDomHelper().getDocument(),
			goog.events.EventType.MOUSEUP,
			this._onMouseUp)
		.listen(
			this.getDomHelper().getDocument(),
			goog.events.EventType.MOUSEMOVE,
			this._onMouseMove)
		;
	this._beforeOffsetY = e.clientY;
};

synthjs.ui.graphics.ControlButton.prototype._onMouseMove = function(e){
	var offsetY = e.clientY;
	var currentValue = this._param.get("internalValue"); 
	var valuePerPx = e.ctrlKey ? 0.0003 : 0.005;
	
	this._param.set("value", currentValue+(this._beforeOffsetY - offsetY)*valuePerPx*this._range);
	this._beforeOffsetY = offsetY;
	e.stopPropagation();
}

synthjs.ui.graphics.ControlButton.prototype._onMouseUp = function(e){
	this.getHandler()
		.unlisten(
			this.getDomHelper().getDocument(),
			goog.events.EventType.MOUSEMOVE,
			this._onMouseMove)
		.unlisten(
			this.getDomHelper().getDocument(),
			goog.events.EventType.MOUSEUP,
			this._onMouseUp)
		;
}

/**
 * @return {Element|boolean}
 */
synthjs.ui.graphics.ControlButton.prototype.getImageElement = function(){
	return this._controlImage ? this._controlImage.getElement() : false;
}
