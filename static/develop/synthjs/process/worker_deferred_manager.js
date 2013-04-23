goog.provide('synthjs.process.WorkerDeferredManager');

goog.require('synthjs.utility.Deferred');
goog.require('synthjs.utility.UUID');


/**
 * @constructor
 * @param {Worker} worker
 * @param {Object} opt_params
 */
synthjs.process.WorkerDeferredManager = function(worker){
	
	this._worker = worker;
	
	this._waitDeferredList = {};
	this._errorHandlerList = {};
	this._onPostMessageBinded = goog.bind(this.onPostMessage, this);
	this._worker.addEventListener("message", this._onPostMessageBinded);
	
	
};

synthjs.process.WorkerDeferredManager.prototype.dispose = function(){

	this._worker.removeEventListener("message", this._onPostMessageBinded);
};

/**
 * callback from worker.
 */
synthjs.process.WorkerDeferredManager.prototype.onPostMessage = function(e){
	if( goog.isDef(e['data']['callback']) ){
		if( this._waitDeferredList[e['data']['callback']] ){
			
			this._waitDeferredList[e['data']['callback']].callback(e['data']);
			delete this._waitDeferredList[e['data']['callback']];
		}
		else{
			throw new Error("invalid callback name");
		}
		
		if( this._errorHandlerList[e['data']['callback']] ){
			delete this._errorHandlerList[e['data']['callback']];
		}
	}
	else{
		console.log(e['data']);
	}
};

synthjs.process.WorkerDeferredManager.prototype.create = function(opt_params, opt_settings){
	opt_params = opt_params || {};
	var callbackname = synthjs.utility.UUID.create();
	var dWait = new synthjs.utility.Deferred();
	
	var d = new synthjs.utility.Deferred().addCallback(goog.bind(function(e){
		if( goog.isFunction( opt_params ) ){
			var params = opt_params(e);
			params['callback'] = callbackname;
			this._worker.postMessage(params);
		}
		else {
			opt_params['callback'] = callbackname;
			this._worker.postMessage(opt_params);
		}
		
	}, this)).awaitDeferred(dWait);
	
	this._waitDeferredList[callbackname] = dWait;
	
	return d;
}

synthjs.process.WorkerDeferredManager.prototype.getPostMessageFunc = function(callbackname, opt_param){
	return goog.bind(function(){
		this.postMessage({'callback':callbackname})
	}, this);
}