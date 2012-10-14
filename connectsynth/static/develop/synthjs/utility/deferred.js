goog.require('goog.async.Deferred');

goog.provide('synthjs.utility.Deferred');

/**
 * @constructor
 * @extends {goog.async.Deferred}
 */
synthjs.utility.Deferred = function(){
	goog.base(this);
}

goog.inherits(synthjs.utility.Deferred, goog.async.Deferred);

/**
 * @param {function} cb
 */
synthjs.utility.Deferred.prototype.assocChainDeferred = function(otherDeferred){
	this.chain_.push([otherDeferred, null, null]); // TODO: to make this.chain_ @protected attribute.
	return this; 
}

/**
 * @override
 */
synthjs.utility.Deferred.prototype.hasErrback_ = function(){
  return goog.array.some(this.chain_, function(chainRow) {
    // The errback is the second element in the array.
	if( chainRow[0] instanceof goog.async.Deferred ){
		return chainRow[0].hasErrback_();
	}
	else {
		return goog.isFunction(chainRow[1]);
	}
  });
};

/**
 * @override
 */
synthjs.utility.Deferred.prototype.fire_ = function() {
  if (this.unhandledExceptionTimeoutId_ && this.hasFired() &&
      this.hasErrback_()) {
    // It is possible to add errbacks after the Deferred has fired. If a new
    // errback is added immediately after the Deferred encountered an unhandled
    // error, but before that error is rethrown, cancel the rethrow.
    goog.global.clearTimeout(this.unhandledExceptionTimeoutId_);
    delete this.unhandledExceptionTimeoutId_;
  }

  if (this.parent_) {
    this.parent_.branches_--;
    delete this.parent_;
  }

  var res = this.result_;
  var unhandledException = false;
  var isChained = false;
//console.log("["+this.name+"] START chain.length="+this.chain_.length);

  while (this.chain_.length && this.paused_ == 0) {
  	
    var chainEntry = this.chain_.shift();
	
	if( chainEntry[0] instanceof goog.async.Deferred ){
		if( !chainEntry[0].hasFired() ){
			chainEntry[0].callback(this.result_);
		}
		else{
			chainEntry[0].continue_(true, this.result_);
		}
		
		this.result_ = res = chainEntry[0].result_;	
		if( chainEntry[0].paused_ ){
			
			goog.asserts.assert(res instanceof goog.async.Deferred, 'Deferred is paused, but result_ is not a instance of Deferred.');

        	res.chained_ = false;
		    res.addCallbacks(
		        goog.bind(chainEntry[0].continue_, chainEntry[0], true /* isSuccess */),
		        goog.bind(chainEntry[0].continue_, chainEntry[0], false /* isSuccess */));			

			isChained = true;
			this.pause_();

		}
		
		
		continue;
	}
	
    var callback = chainEntry[0];
    var errback = chainEntry[1];
    var scope = chainEntry[2];

    var f = this.hadError_ ? errback : callback;
    if (f) {
//      try {
        var ret = f.call(scope || this.defaultScope_, res);

        // If no result, then use previous result.
        if (goog.isDef(ret)) {
          // Bubble up the error as long as the return value hasn't changed.
          this.hadError_ = this.hadError_ && (ret == res || this.isError(ret));
          this.result_ = res = ret;
        }

        if (res instanceof goog.async.Deferred) {
          isChained = true;          
          this.pause_();
        }

/*      } catch (ex) {
        res = ex;
        this.hadError_ = true;

        if (!this.hasErrback_()) {
          // If an error is thrown with no additional errbacks in the queue,
          // prepare to rethrow the error.
          unhandledException = true;
        }
   
      }
*/           
    }
  }
  
  this.result_ = res;
  
  if (isChained && this.paused_) {
  	res.addCallbacks(
        goog.bind(this.continue_, this, true /* isSuccess */),
        goog.bind(this.continue_, this, false /* isSuccess */));
    res.chained_ = true;
  }

  if (unhandledException) {
    // Throw an UnhandledError after a timeout. Execution will continue, but
    // the error will be seen by global handlers and the user. The throw will
    // be canceled if another errback is appended before the timeout executes.
    this.unhandledExceptionTimeoutId_ = goog.global.setTimeout(function() {
      throw new goog.async.Deferred.UnhandledError(/** @type {!Error} */ (res));
    }, 0);
  }
//console.log("["+this.name+"] END chain.length="+this.chain_.length);
};

/**
* @override
* @param {Object} opt_propagateCancel
*/
synthjs.utility.Deferred.prototype.branch = function(opt_propagateCancel) {
 var d = new synthjs.utility.Deferred();
 d.name = 'branch';
 this.chainDeferred(d);
 if (opt_propagateCancel) {
   d.parent_ = this;
   this.branches_++;
 }
 return d;
};