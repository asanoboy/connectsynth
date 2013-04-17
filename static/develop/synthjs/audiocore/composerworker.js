goog.provide("synthjs.audiocore.ComposerWorker");

goog.require("synthjs.audiocore.ComposerWorkerSequence");
goog.require("synthjs.audiocore.PerformerBase");
goog.require("synthjs.utility.WorkerDeferredManager");
goog.require("synthjs.utility.Deferred");

goog.scope(function(){

var Deferred = synthjs.utility.Deferred;

var ComposerWorker = synthjs.audiocore.ComposerWorker = function(workerpath, sampleRate){
    goog.base(this);
    this._worker = new Worker(workerpath);
    this._workerManager = new synthjs.utility.WorkerDeferredManager(this._worker);

    this._performers = [];
    this._sampleRate = sampleRate;
};
goog.inherits(ComposerWorker, synthjs.audiocore.PerformerBase);

goog.object.extend(ComposerWorker, {

});

goog.object.extend(ComposerWorker.prototype, {
    /**
     * Adds synthjs.audiocore.DummyPerformer
     * @param {synthjs.audiocore.DummyPerformer} performer [description]
     */
    addPerformer: function(performer){
        performer.setSampleRate(this._sampleRate);

        this.getHandler().listen(
            performer.getWave(),
            synthjs.audiocore.DummyWavePlugin.EventType.CHANGE_PARAM,
            function(){},
            this);
        this._performers.push(performer);
    },
    setSampleRate: function(sampleRate){},
    setTempo: function(tempo){},
    eof: function(){

    },
    getBufferDeferred: function(len){

    },
    onWaveParamChange: function(e){

    }

});

var Sequence = synthjs.audiocore.ComposerWorkerSequence = function(){
    this._sequence = [];
};

goog.object.extend(Sequence.prototype, {

});

});