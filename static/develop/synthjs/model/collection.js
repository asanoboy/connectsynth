goog.provide("synthjs.model.Collection");
goog.provide("synthjs.model.Collection.EventType");

goog.require("synthjs.utility.EventTarget");

/**
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 * @param {function} modelConstructor
 */
synthjs.model.Collection = function(modelConstructor){
	goog.base(this);
	this._modelConstructor = modelConstructor;
	
	/**
	 * @protected
	 */
	this._models = [];
};

goog.inherits(synthjs.model.Collection, synthjs.utility.EventTarget);

/**
 * @param {synthjs.model.Base} model
 * @return {boolean}
 */
synthjs.model.Collection.prototype.has = function(model){
	return goog.array.find(this._models, function(m){
		return m[0].equals(model);
	}) ? true : false;
}


/**
 * @param {synthjs.model.Base} models
 */
synthjs.model.Collection.prototype.add = function(model){
	this._addInternal(model);
}

/**
 * @private
 * @param {synthjs.model.Base} models
 */
synthjs.model.Collection.prototype._addInternal = function(model, opt_param){
	
	if( !(model instanceof this._modelConstructor) ){
		throw new Error("Collection was added invalid instance.");
	}
	
	opt_param = opt_param ? opt_param : null;
	
	this._models.push([model, opt_param]);
	this.dispatchEvent(new goog.events.Event(
		synthjs.model.Collection.EventType.ADD, 
		model
	));
	
}

/**
 * @param {synthjs.model.Base} models
 */
synthjs.model.Collection.prototype.remove = function(model){
	return this._removeInternal(model);
}

/**
 * @private
 * @param {synthjs.model.Base} models
 * @return {boolean} If input model has been removed, return true, or false.
 */
synthjs.model.Collection.prototype._removeInternal = function(model){
	
	var result = goog.array.removeIf(this._models, function(m){
		return model.equals(m[0]);
	});
	
	
	if( result ){
		this.dispatchEvent(new goog.events.Event(
			synthjs.model.Collection.EventType.REMOVE, 
			model
		));
		return true;
	}
	return false;
}


synthjs.model.Collection.prototype.reset = function(){
	this._resetInternal();
};

/**
 * @return {Array} 
 */
synthjs.model.Collection.prototype.getAll = function(){
	return goog.array.map(this._models, function(m){
		return m[0];
	});
}

/**
 * 
 */
synthjs.model.Collection.prototype._resetInternal = function(){
	
	this._models = [];
	this.dispatchEvent(new goog.events.Event(
		synthjs.model.Collection.EventType.RESET
	));
}

synthjs.model.Collection.EventType = {
	ADD: "collection-add",
	REMOVE: "collection-remove",
	RESET: "collection-reset"
}
