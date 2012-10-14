goog.provide("synthjs.model.Base");

goog.require("synthjs.model.EventType");
goog.require('goog.events.EventTarget');
goog.require("goog.object");
/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
synthjs.model.Base = function(attrs){
	goog.base(this);
	this._attrs = attrs;
}

goog.inherits(synthjs.model.Base, goog.events.EventTarget);

synthjs.model.Base.prototype._attrs = {};

/**
 * @param {string} attr
 * @param {*} value
 * @param {boolean=} opt_silent If this is true, this doesnot dispatch CHANGE event.
 */
synthjs.model.Base.prototype.set = function(attr, value, opt_silent){
	if( !goog.object.containsKey(this._attrs, attr) ) {
		throw new Error("'"+attr+"' does not match attrs.");
	}
	var before = this._attrs[attr];
	this._attrs[attr] = value;
	
	if( opt_silent ) return true;
	
	this.dispatchEvent(new goog.events.Event(
		synthjs.model.EventType.CHANGE,
		{attr: attr, before: before, after: value, model: this}));
	return true;
}

synthjs.model.Base.prototype.get = function(attr){
	if( !goog.object.containsKey(this._attrs, attr) ) {
		throw new Error("'"+attr+"' does not match attrs.");
	}
	return this._attrs[attr];
}

synthjs.model.Base.prototype.equals = function(model){
	return model == this;
}
