goog.provide("synthjs.ui.graphics.GraphicsComponent");

goog.require("synthjs.utility.EventTarget");


/**
 * This class behaviors like goog.ui.Component but decorates an instance of goog.graphics.AbstractGraphics.
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 */
synthjs.ui.graphics.GraphicsComponent = function(opt_domHelper){
	this._dom = opt_domHelper || goog.dom.getDomHelper();
	goog.base(this);	
	this._hasEntered = false;
}
goog.inherits(synthjs.ui.graphics.GraphicsComponent, synthjs.utility.EventTarget);

/**
 * @param {goog.grahpics.AbstractGraphics} graphics
 */
synthjs.ui.graphics.GraphicsComponent.prototype.decorate = function(graphics){
	this._graphics = graphics;
	this.decorateInternal(graphics);
	if( !this._hasEntered ){
		this.enterDocument();
	}
	this._hasEntered = true;
}

synthjs.ui.graphics.GraphicsComponent.prototype.getGraphics = function(){
	return this._graphics || false;
}

synthjs.ui.graphics.GraphicsComponent.prototype.decorateInternal = function(){
	
};

synthjs.ui.graphics.GraphicsComponent.prototype.enterDocument = function(){
	
};

synthjs.ui.graphics.GraphicsComponent.prototype.getDomHelper = function(){
	return this._dom;
};