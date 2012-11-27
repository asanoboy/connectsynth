goog.provide("synthjs.ui.graphics.ToggleButton");

goog.require("synthjs.ui.graphics.GraphicsComponent");
goog.require("goog.graphics.ext");

/**
 * This class is component of rotating control.
 * @constructor
 * @extends {synthjs.ui.graphics.GraphicsComponent}
 * @param {synthjs.model.PluginToggleParam} param
 * @param {goog.graphics.AbstractGraphics} graphics
 */
synthjs.ui.graphics.ToggleButton = function(param, grahpics, opt_domHelper){
	goog.base(this, opt_domHelper);
	this._param = param;
}

goog.inherits(synthjs.ui.graphics.ToggleButton, synthjs.ui.graphics.GraphicsComponent);

/**
 * @override
 */
synthjs.ui.graphics.ToggleButton.prototype.decorateInternal = function(gr){
	goog.base(this, "decorateInternal", gr);
	
	var width = this._param.get("width"),
		height = this._param.get("height"),
		offsetX = this._param.get("offsetX"),
		offsetY = this._param.get("offsetY"),
		value = this._param.get("value"),
		imagepathOn = this._param.get("imagepathOn"),
		imagepathOff = this._param.get("imagepathOff"),
		imagepath = value ? imagepathOn : imagepathOff;
	
	this._imagepathOn = imagepathOn;
	this._imagepathOff = imagepathOff;
	// this._offsetX = offsetX-width/2;
	// this._offsetY = offsetY-height/2;
	this._offsetX = offsetX;
	this._offsetY = offsetY;
	this._width = width;
	this._height = height;
	
	
	var group = gr.createGroup();
	group.setSize(width+'px', height+'px');
	this._group = group;
	
	this.updateImage(imagepath);
}

/**
 * @override
 */
synthjs.ui.graphics.ToggleButton.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	
	this._setValue(this._param.get("value"));
	
	this.getHandler()
//		.listen(
//			this._controlImage,
//			goog.events.EventType.CLICK,
//			this._onMouseClick)
		.listen(
			this._param,
			synthjs.model.EventType.CHANGE,
			this._onModelChange
		)
}

/**
 * If goog.graphics.ImageElement.setSource() is available, use the method, but it's not available.
 * So this function redraws and reattaches event.
 * @param {string} src
 */
synthjs.ui.graphics.ToggleButton.prototype.updateImage = function(src){
	
	if( !this._controlImage ){
		this._controlImage = this.getGraphics().drawImage(
			this._offsetX, 
			this._offsetY, 
			this._width, 
			this._height, 
			src);	
		
		this.getHandler()
			.listen(
				this._controlImage,
				goog.events.EventType.CLICK,
				this._onMouseClick);
	}
	else {
		this._controlImage.setSource(src);
		
		// Update href attribute of image element, because setSource() does not update href.
		// Is this a bug of Closure Library?
		if( this._controlImage instanceof goog.graphics.SvgImageElement ){
			this.getGraphics().setElementAttributes( this._controlImage.getElement(), {"href": src} );
		}
		
	}
	
}
	

/**
 * @param {number} value = 0 or 1
 */
synthjs.ui.graphics.ToggleButton.prototype._setValue = function(value){
	var imagepath = value ? this._imagepathOn : this._imagepathOff;
	this.updateImage(imagepath);
}

/**
 * @param {number} value [0,1]
 */
synthjs.ui.graphics.ToggleButton.prototype._onModelChange = function(e){
	this._setValue(e.target.after);
}

synthjs.ui.graphics.ToggleButton.prototype._onMouseClick = function(e){
	this._param.set( 
		"value", 
		this._param.get("value") ? 0 : 1 // Toggle 
	);
};

/**
 * @return {Element|boolean}
 */
synthjs.ui.graphics.ToggleButton.prototype.getImageElement = function(){
	return this._controlImage ? this._controlImage.getElement() : false;
}
