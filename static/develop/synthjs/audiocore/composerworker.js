goog.provide("synthjs.audiocore.ComposerWorker");

goog.require("synthjs.audiocore.ComposerWorkerBase");
goog.require("synthjs.process.WorkerManager");

goog.scope(function(){

var ComposerWorker = synthjs.audiocore.ComposerWorker = function(workerpath, sampleRate){
    this._worker = new Worker(workerpath);
    this._workerManager = new synthjs.process.WorkerManager(this._worker);

    goog.base(this, workerpath, sampleRate);
};
goog.inherits(ComposerWorker, synthjs.audiocore.ComposerWorkerBase);


goog.object.extend(ComposerWorker.prototype, {
    getBufferDeferredWorkerInternal: function(dump){
        return this._workerManager.create(dump);
    }
});

});