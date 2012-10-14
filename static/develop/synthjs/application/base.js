goog.provide("synthjs.application.Base");

goog.require("synthjs.audiocore.Player");
goog.require("synthjs.ui.MenuAndBody");

/**
 * @constructor
 */
synthjs.application.Base = function(id){
	
	/**
	 * @type {string}
	 */
	this._targetId = id;
	this._rootComponent = new synthjs.ui.MenuAndBody(
		this._getMenuComponent(),
		this._getBodyComponent());
	
	this._rootComponent.render(goog.dom.getElement(this._targetId));
	this._attachEvents();
	this._init();
}

/**
 * @protected
 */
synthjs.application.Base.prototype._init = goog.abstractMethod;

/**
 * @protected
 */
synthjs.application.Base.prototype._getMenuComponent = goog.abstractMethod;

/**
 * @protected
 */
synthjs.application.Base.prototype._getBodyComponent = goog.abstractMethod;

// synthjs.application.Base.prototype.init = function(){
// 	
	// this._rootComponent = new synthjs.ui.MenuAndBody(
		// this._getMenuComponent(),
		// this._getBodyComponent());
// 	
	// this._rootComponent.render(goog.dom.getElement(this._targetId));
	// this._attachEvents();
// }

synthjs.application.Base.prototype._attachEvents = function(){
}

synthjs.application.Base.prototype.getHandler = function(){
	return this._eventHandler || 
		(this._eventHandler = new goog.events.EventHandler(this));
}

synthjs.application.Base.prototype.onResize = function(){
	this._rootComponent.onResize();
}
