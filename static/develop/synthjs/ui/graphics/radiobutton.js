goog.provide("synthjs.ui.graphics.RadioButton");

goog.require("synthjs.ui.graphics.GraphicsComponent");
goog.require("goog.graphics.ext");

/**
 * This class is component of radio button.
 * @constructor
 * @extends {synthjs.ui.graphics.GraphicsComponent}
 * @param {synthjs.model.PluginRadioParam} param
 * @param {goog.graphics.AbstractGraphics} graphics
 */
synthjs.ui.graphics.RadioButton = function(param, grahpics, opt_domHelper){
	goog.base(this, opt_domHelper);
	this._param = param;
}

goog.inherits(synthjs.ui.graphics.RadioButton, synthjs.ui.graphics.GraphicsComponent);

/**
 * @override
 */
synthjs.ui.graphics.RadioButton.prototype.decorateInternal = function(gr){
	goog.base(this, "decorateInternal", gr);
	
	var width = this._param.get("width"),
		height = this._param.get("height"),
		offsetList = this._param.get("offsets"),
		value = this._param.get("value"),
		imagepathOn = this._param.get("imagepathOn"),
		imagepathOff = this._param.get("imagepathOff");
	
	this._imagepathOn = imagepathOn;
	this._imagepathOff = imagepathOff;
	this._offsetList = goog.array.map(offsetList, function(offset){
		return {
			// offsetX: offset.offsetX-width/2,
			// offsetY: offset.offsetY-height/2};
			offsetX: offset.offsetX,
			offsetY: offset.offsetY};
	});
	
	this._width = width;
	this._height = height;
	
	
	var group = gr.createGroup();
	group.setSize(width+'px', height+'px');
	this._group = group;
	
	this.updateImage();
}

/**
 * @override
 */
synthjs.ui.graphics.RadioButton.prototype.enterDocument = function(){
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
 * @param {string} src
 */
synthjs.ui.graphics.RadioButton.prototype.updateImage = function(){
	
	if( !this._controlImageList ){
			
		this._controlImageList = [];
		goog.array.forEach( this._offsetList, function(offset, index){
			var src = this._param.get("value")==index ? 
				this._imagepathOn : this._imagepathOff;
			
			// Put the center of the image on coordinate of (offsetX, offsetY)
			var image = this.getGraphics().drawImage(
				offset.offsetX, 
				offset.offsetY, 
				this._width, 
				this._height, 
				src);
			
			this.getHandler()
				.listen(
					image,
					goog.events.EventType.CLICK,
					this._onMouseClick);
					
			this._controlImageList.push(image);	
		}, this);
		
	}
	else {
		goog.array.forEach(this._controlImageList, function(image, index){
			var src = this._param.get("value")==index ? 
				this._imagepathOn : this._imagepathOff;
			
			image.setSource(src);
		
			// Update href attribute of image element, because setSource() does not update href.
			// Is this a bug of Closure Library?
			if( image instanceof goog.graphics.SvgImageElement ){
				this.getGraphics().setElementAttributes( image.getElement(), {"href": src} );
			}
			
		}, this);
	}
	
}

/**
 * @param {number} value = 0 or 1
 */
synthjs.ui.graphics.RadioButton.prototype._setValue = function(){
	this.updateImage();
}

/**
 * @param {number} value [0,1]
 */
synthjs.ui.graphics.RadioButton.prototype._onModelChange = function(e){
	this._setValue();
}

synthjs.ui.graphics.RadioButton.prototype._onMouseClick = function(e){
	
	var index = goog.array.findIndex(this._controlImageList, function(image){
		return image==e.currentTarget;
	} );
	
	goog.asserts.assertNumber(index);
	
	this._param.set( 
		"value", 
		index 
	);
};

/**
 * @param {number} index
 * @return {Element|boolean}
 */
synthjs.ui.graphics.RadioButton.prototype.getImageElement = function(index){
	return this._controlImageList[index] || false;
}
