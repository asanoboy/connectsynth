goog.provide("synthjs.audiocore.ComposerIframeWorker");

goog.require("synthjs.audiocore.ComposerWorkerBase");
goog.require("synthjs.process.WorkerManager");
goog.require("synthjs.process.Child");

goog.scope(function(){

var ComposerIframeWorker = synthjs.audiocore.ComposerIframeWorker = function(workerpath, parentElement, sampleRate){

    this._childProcess = null;
    // this._workerpath = workerpath;
    // this._parentElement = parentElement;

    // this._worker = null;
    this._workerManager = null;// = new synthjs.process.WorkerManager(this._worker);
    this._waitLoadDeferred = new synthjs.utility.Deferred();
    goog.base(this, sampleRate);
    synthjs.process.Child.loadIframeDeferred(workerpath, parentElement)
        .addCallback(
            goog.bind(function(child){
                // console.log("======ON LOADED");
                this._workerManager = new synthjs.process.WorkerManager(child);
                this._waitLoadDeferred.callback();
            }, this)
        )
        .callback();
};
goog.inherits(ComposerIframeWorker, synthjs.audiocore.ComposerWorkerBase);


goog.object.extend(ComposerIframeWorker.prototype, {
    getBufferDeferredWorkerInternal: function(dump){
        if( this._workerManager ){
            return this._workerManager.create(dump);
        }

        // console.log("====NOT LOADED YET");
        var dWait = new synthjs.utility.Deferred();
        return new synthjs.utility.Deferred()
            // .addCallback(function(){
            //     console.log("=======getBufferStart");
            // })
            .awaitDeferred(this._waitLoadDeferred)
            .addCallback(
                goog.bind(function(){
                    this._workerManager.create(dump).chainDeferred(dWait).callback();
                }, this)
            )
            .awaitDeferred(dWait);

        //     d = new synthjs.utility.Deferred()
        //         .addCallback(
        //             goog.bind(function(){
        //                 //TODO: UNDER CONSTRUCT
        //                 if( this._hasProcessLaunched ){
        //                     dWait.callback();
        //                 }

        //                 var dInit = synthjs.process.Child.loadIframeDeferred(this._workerpath, this._parentElement);

        //                 dInit.addCallback(
        //                     goog.bind(function(child){
        //                         this._childProcess = child;
        //                         this.handler
        //                     }, this)
        //                 );
        //             }, this)
        //         )
        //         .awaitDeferred(d)
        //         .assocChainDeferred(dBuffer);
    }
});

});