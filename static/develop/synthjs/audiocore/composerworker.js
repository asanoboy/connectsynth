goog.provide("synthjs.audiocore.ComposerWorker");

goog.require("synthjs.utility.WorkerDeferredManager");
goog.require("synthjs.utility.Deferred");

goog.scope(function(){

var Deferred = synthjs.utility.Deferred;

var ComposerWorker = synthjs.audiocore.ComposerWorker = function(workerpath){
    this._worker = new Worker(workerpath);
    this._workerManager = new synthjs.utility.WorkerDeferredManager(this._worker);
};

goog.object.extend(ComposerWorker, {

});

goog.object.extend(ComposerWorker.prototype, {
    addPerformer: function(performer){},
    setSampleRate: function(sampleRate){},
    setTempo: function(tempo){},
    eof: function(){

    },
    getBufferDeferred: function(len){

    }

});

});