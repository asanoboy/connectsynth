goog.provide("synthjs.application.Base");

goog.require("synthjs.audiocore.Player");
goog.require("synthjs.ui.MenuAndBody");

goog.require("synthjs.ui.AjaxLoader");
goog.require("synthjs.utility.AjaxDeferred");

goog.require("synthjs.ui.MenuBar");

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

	this._ajaxLoader = new synthjs.ui.AjaxLoader();
	synthjs.utility.AjaxDeferred.defaultPresend = goog.bind(function(){
		this._ajaxLoader.setVisible(true);
	}, this);
	synthjs.utility.AjaxDeferred.defaultPostsend = goog.bind(function(){
		this._ajaxLoader.setVisible(false);
	}, this);

	this._rootComponent.render(goog.dom.getElement(this._targetId));
	this._attachEvents();
	this._init();
};

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

synthjs.application.Base.prototype._attachEvents = function(){
};

synthjs.application.Base.prototype.getHandler = function(){
	return this._eventHandler ||
		(this._eventHandler = new goog.events.EventHandler(this));
};

// synthjs.application.Base.prototype.onResize = function(){
// 	console.log('resize');
// 	this._rootComponent.onResize();
// };
