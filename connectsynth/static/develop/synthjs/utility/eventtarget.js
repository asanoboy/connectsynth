goog.provide("synthjs.utility.EventTarget");

goog.require("goog.events.EventTarget");
goog.require("goog.events.EventHandler");

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
synthjs.utility.EventTarget = function(){
	goog.base(this);
}

goog.inherits(synthjs.utility.EventTarget, goog.events.EventTarget);

synthjs.utility.EventTarget.prototype.getHandler = function(){
	return this._eventHandler ||
         (this._eventHandler = new goog.events.EventHandler(this));
}

synthjs.utility.EventTarget.prototype.disposeInternal = function(){
	
	goog.base(this, "disposeInternal");
	
	if(this.googUiComponentHandler_) {
		this._eventHandler.dispose();
		delete this._eventHandler;
	}
}