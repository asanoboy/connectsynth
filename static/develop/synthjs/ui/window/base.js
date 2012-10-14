goog.provide("synthjs.ui.window.Base");
goog.provide("synthjs.ui.window.EventType");

goog.require("goog.events.EventHandler");
goog.require("goog.ui.Component");

/**
 * @constructor
 * @param {string} label
 * @param {goog.ui.Component} component
 */
synthjs.ui.window.Base = function(label, settings, opt_domHelper){
	goog.base(this, opt_domHelper);
	this._eventHandler = new goog.events.EventHandler();
	this._label = label;
	this._isDeletable = settings && settings.isDeletable===false ? false : true;
}

goog.inherits(synthjs.ui.window.Base, goog.ui.Component);

/**
 * @param {synthjs.ui.window.Base} window
 */
synthjs.ui.window.Base.prototype.equals = function(window){
	return this.constructor == window.constructor; 
}

synthjs.ui.window.Base.prototype.getLabel = function(){
	return this._label;
}

synthjs.ui.window.EventType = {
	CHANGE_LABEL: 'change_label'
};

synthjs.ui.window.Base.prototype.resize = function(){
	
}
