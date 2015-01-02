goog.provide('synthjs.process.WorkerManager');

goog.require("goog.events.EventHandler");
goog.require("synthjs.process.EventType");
goog.require('synthjs.utility.Deferred');
goog.require('synthjs.utility.UUID');


/**
 * @constructor
 * @param {synthjs.process.Child|synthjs.process.Worker} child
 */
// synthjs.process.WorkerManager = function(worker){
synthjs.process.WorkerManager = function(child){
	// this._worker = worker;
	this._child = child;
	this._waitDeferredList = {};
	this._errorHandlerList = {};
	// this._onPostMessageBinded = goog.bind(this.onPostMessage, this);
	// this._worker.addEventListener("message", this._onPostMessageBinded);
	this.getHandler().listen(
		this._child,
		synthjs.process.EventType.MESSAGE,
		this.onPostMessage);

};

synthjs.process.WorkerManager.prototype.getHandler = function(){
    return this._hander || (this._handler = new goog.events.EventHandler(this));
};

synthjs.process.WorkerManager.prototype.dispose = function(){
	if( this._handler ){
		this._handler.dispose();
	}
};

/**
 * callback from child.
 */
synthjs.process.WorkerManager.prototype.onPostMessage = function(e){
	if( 'callback' in e.target && 'result' in e.target){
		if( e.target['callback'] in this._waitDeferredList ){

			this._waitDeferredList[e.target['callback']].callback(e.target['result']);
			delete this._waitDeferredList[e.target['callback']];
		}
		else{
			goog.asserts.fail("invalid callback name");
		}

		if( e.target['callback'] in this._errorHandlerList ){
			delete this._errorHandlerList[e.target['callback']];
		}
	}
	else{
		console.log(e.target);
	}
};

synthjs.process.WorkerManager.prototype.create = function(opt_params, opt_settings){
	opt_params = opt_params || {};
	var callbackname = synthjs.utility.UUID.create();
	var dWait = new synthjs.utility.Deferred();

	var d = new synthjs.utility.Deferred().addCallback(goog.bind(function(e){
		if( goog.isFunction( opt_params ) ){
			var params = opt_params(e);
			// params['callback'] = callbackname;
			// this._worker.postMessage(params);
            this._child.postMessage({
                'query': params,
                'callback': callbackname});
		}
		else {
			// opt_params['callback'] = callbackname;
			// this._worker.postMessage(opt_params);
            // this._child.postMessage(opt_params);
            this._child.postMessage({
                'query': opt_params,
                'callback': callbackname});
		}
	}, this)).awaitDeferred(dWait);

	this._waitDeferredList[callbackname] = dWait;

	return d;
};

// synthjs.process.WorkerManager.prototype.getPostMessageFunc = function(callbackname, opt_param){
// 	return goog.bind(function(){
//         this.postMessage({'callback':callbackname});
// 	}, this);
// };