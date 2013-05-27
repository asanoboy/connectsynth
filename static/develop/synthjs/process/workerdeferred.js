goog.require('synthjs.utility.Deferred');

goog.provide('synthjs.process.WorkerDeferred');

/**
 * @constructor
 * @extends {synthjs.utility.Deferred}
 * @param {worker} worker
 * @param {Object} opt_params
 */
synthjs.process.WorkerDeferred = function(worker, opt_params, opt_settings){

	goog.base(this);
	this._worker = worker;
	this._dWait = new synthjs.utility.Deferred();
	//this._dWait.name = 'waitt';
	this._callbackname = this._createUniqueId();
	this._settings = opt_settings ? opt_settings : {};
	this._params = opt_params ? opt_params : null;
	
	this._attachListener();
	
	this.addCallback(goog.bind(this.postMessage, this)).awaitDeferred(this._dWait);
	
};

goog.inherits(synthjs.process.WorkerDeferred, synthjs.utility.Deferred);

synthjs.process.WorkerDeferred.prototype.postMessage = function(e){
	console.log("FUGA");
	if( goog.isFunction( this._params ) ){
		var params = this._params(e);
		params['callback'] = this._callbackname;
		this._worker.postMessage(params);
	}
	else {
		this._params['callback'] = this._callbackname;
		this._worker.postMessage(this._params);
	}
};

synthjs.process.WorkerDeferred.prototype._attachListener = function(){
	this._worker.addEventListener("message", goog.bind(this.successListener, this));
	if( goog.isFunction(this._settings.error) ){
		this._worker.addEventListener("error", goog.bind(this.errorListener, this));
	}
};

synthjs.process.WorkerDeferred.prototype.successListener = function(e){
	if( e.data['callback'] == this._callbackname ){
		this._worker.removeEventListener("message", this._listener);
		this._dWait.callback(e.data);
	}
	e = void 0;
};

synthjs.process.WorkerDeferred.prototype.errorListener = function(e){
	this._worker.removeEventListener("error", this.errorListener);
	this._dWait.callback( this._settings.error(e) );
	e = void 0;
};

synthjs.process.WorkerDeferred.prototype._createUniqueId = function(){
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1) + '_' +
		(((1+Math.random())*0x10000)|0).toString(16).substring(1) + '_' +
		(((1+Math.random())*0x10000)|0).toString(16).substring(1) + '_' +
		(((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
