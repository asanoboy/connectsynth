goog.provide("synthjs.model.PluginPreset");

goog.require("synthjs.model.Base");
goog.require("goog.json");
/**
 * @constructor
 * @extends{synthjs.model.Base}
 * @param {string} name
 * @param {string} code
 * @param {string} value in json format
 */
synthjs.model.PluginPreset = function(
		name, code, value){
	this._isValid = true;
	var arr = goog.json.parse(value) ;
	if ( !goog.isArray(arr) ){
		this._isValid = false;
		arr = [];
	}
	var tmp = [];
	goog.array.forEach(arr, function(e){
		this._isValid &= goog.isDef( e['name'] );
		this._isValid &= goog.isDef( e['value'] );
		if( this._isValid ){
			tmp.push({name: e['name'], value: e['value']});
		}
	}, this);
	
	goog.base(this, {
		"name": name,
		"value": tmp,
		"code": code
	});
}

goog.inherits(synthjs.model.PluginPreset, synthjs.model.Base);

synthjs.model.PluginPreset.prototype.isValid = function(){
	return this._isValid;
}

