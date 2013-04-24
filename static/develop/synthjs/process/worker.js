goog.provide("synthjs.process.Worker");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.process.EventType");

goog.scope(function(){

synthjs.process.Worker = function(url){
    goog.base(this);
    this._worker = new Worker(url);
    this._worker.addEventListener("message", goog.bind(this.onMessage, this));    
};

goog.inherits(synthjs.process.Worker, synthjs.utility.EventTarget);

goog.object.extend(synthjs.process.Worker.prototype, {
    disposeInternal: function(){
        goog.base(this, "disposeInternal");
    },
    postMessage: function(msg){
        this._worker.postMessage(msg);
    },
    onMessage: function(e){
        this.dispatchEvent(
            new goog.events.Event(
                synthjs.process.EventType.MESSAGE,
                e.data
            )
        );
    }

});

});