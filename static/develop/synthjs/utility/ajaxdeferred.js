goog.provide('synthjs.utility.AjaxDeferred');

goog.require('synthjs.utility.Deferred');
goog.require("goog.events.EventHandler");
goog.require("goog.net.EventType");
//goog.require("goog.net.XhrIo");
goog.require("synthjs.net.XhrIo");

goog.scope(function(){
	
var XhrIo = synthjs.net.XhrIo;

/**
 * @constructor
 * @extends {synthjs.utility.Deferred}
 */
synthjs.utility.AjaxDeferred = function(url, settings, opt_context){
	goog.base(this);
	settings = settings || {};

	this._eventHandler = new goog.events.EventHandler();
	this._method = (settings.method && ( settings.method.toLowerCase()=='post' || settings.method.toLowerCase()=='put') ) ? 
		settings.method.toLowerCase() : "get";
	
	//console.log(settings.data);
	if( goog.isString(settings.data) || settings.data instanceof FormData ){
		this._data = settings.data;
	}
	else if( goog.isObject(settings.data) ){
		this._data = new FormData();
		goog.object.forEach(settings.data, function(val, key){
			this._data.append(key, val);
		}, this);
	}
	else {
		this._data = null;
	}
	
	//this._data = settings.data || {};
	
	this._headers = {};
	if( typeof settings.contentType != 'undefined' ){
		this._headers['Content-Type'] = settings.contentType;
	} 
	
	this._xhr = new XhrIo();
	var dWait = new synthjs.utility.Deferred();
	if( settings.success ){
		if( opt_context ){
			settings.success = goog.bind(settings.success, opt_context);
		}
		this._eventHandler.listen( this._xhr, goog.net.EventType.SUCCESS, function(e){
			settings.success(e.target);
			dWait.callback();
		});
	}
	
	if( settings.error ){
		settings.error = goog.bind(settings.error, opt_context);
		this._eventHandler.listen( this._xhr, goog.net.EventType.ERROR, function(e){
			dWait.callback(settings.error(e.target));
		});
	}
	
	if( settings.responseType ){
		this._xhr.setResponseType(settings.responseType);
	}
	
	this.addCallback(function(){
		this._xhr.send(url, this._method, this._data, this._headers);
	}, this).awaitDeferred(dWait);
};

goog.inherits(synthjs.utility.AjaxDeferred, synthjs.utility.Deferred);

});