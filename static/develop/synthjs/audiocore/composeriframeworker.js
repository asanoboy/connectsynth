goog.provide("synthjs.audiocore.ComposerIframeWorker");

goog.require("synthjs.audiocore.ComposerWorkerBase");
goog.require("synthjs.process.WorkerManager");
goog.require("synthjs.process.Child");

goog.scope(function(){

var ComposerIframeWorker = synthjs.audiocore.ComposerIframeWorker = function(workerpath, parentElement, sampleRate){

    this._childProcess = null;
    this._hasProcessLaunched = false;
    this._workerpath = workerpath;
    this._parentElement = parentElement;

    goog.base(this, sampleRate);
};
goog.inherits(ComposerIframeWorker, synthjs.audiocore.ComposerWorkerBase);


goog.object.extend(ComposerIframeWorker.prototype, {
    getBufferDeferredWorkerInternal: function(dump){
        var dBuffer = this._workerManager.create(dump);
        if( this._hasProcessLaunched ){
            return dBuffer;
        }

        var dWait = new synthjs.utility.Deferred(),
            d = new synthjs.utility.Deferred()
                .addCallback(
                    goog.bind(function(){
                        //TODO: UNDER CONSTRUCT
                        if( this._hasProcessLaunched ){
                            dWait.callback();
                        }

                        var dInit = synthjs.process.Child.loadIframeDeferred(this._workerpath, this._parentElement);

                        dInit.addCallback(
                            goog.bind(function(child){
                                this._childProcess = child;
                                this.handler
                            }, this)
                        );
                    }, this)
                )
                .awaitDeferred(d)
                .assocChainDeferred(dBuffer);
    }
});

});