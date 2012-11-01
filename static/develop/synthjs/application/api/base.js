goog.provide("synthjs.application.api.Base");

/**
 * @constructor
 * @parma {goog.Uri}
 */
synthjs.application.api.Base = function(baseUri){
	this._baseUri = baseUri;
};

/**
 * @param {string} name
 * @return {goog.Uri}
 */
synthjs.application.api.Base.prototype.bootstrap = function(name){
	return this._bootstrapUri.resolve(new goog.Uri(path))
}
