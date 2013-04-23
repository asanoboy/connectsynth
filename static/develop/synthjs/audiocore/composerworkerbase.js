goog.provide("synthjs.audiocore.ComposerWorkerBase");


goog.require("synthjs.audiocore.ComposerSequence");
goog.require("synthjs.audiocore.PerformerBase");
goog.require("synthjs.process.WorkerManager");
goog.require("synthjs.utility.Deferred");

goog.scope(function(){

var Deferred = synthjs.utility.Deferred;

var ComposerWorkerBase = synthjs.audiocore.ComposerWorkerBase = function(sampleRate){
    // this._worker = new Worker(workerpath);
    // this._workerManager = new synthjs.process.WorkerManager(this._worker);

    this._performers = [];
    this._sequence = new synthjs.audiocore.ComposerSequence();
    goog.base(this);
    this.setSampleRate(sampleRate);
};
goog.inherits(ComposerWorkerBase, synthjs.audiocore.PerformerBase);

goog.object.extend(ComposerWorkerBase, {

});

goog.object.extend(ComposerWorkerBase.prototype, {

    /**
     * Adds synthjs.audiocore.DummyPerformer
     * @param {synthjs.audiocore.DummyPerformer} performer [description]
     */
    addPerformer: function(performer){
        performer.setSampleRate(this._sampleRate);
        this._performers.push(performer);
    },
    setSampleRate: function(sampleRate){
        goog.base(this, "setSampleRate", sampleRate);
        goog.array.forEach(this._performers, function(p){
            p.setSampleRate(sampleRate);
        });
    },
    setTempo: function(tempo){
        goog.base(this, "setTempo", tempo);
        goog.array.forEach(this._performers, function(p){
            p.setTempo(tempo);
        });
    },
    eof: function(){
        return goog.base(this, 'eof') && goog.array.every(this._performers, function(p){
            return p.eof();
        });
    },
    getBufferDeferred: function(length){

        this.getBufferDeferredInternal(length);
        goog.array.forEach(this._performers, function(performer){
            this._sequence.join(performer.getSequence());
            performer.flushSequence();
        }, this);

        var dump = this._sequence.getDump();
        this._sequence = new synthjs.audiocore.ComposerSequence();
        return this.getBufferDeferredWorkerInternal(dump);
    },

    getBufferDeferredWorkerInternal: goog.abstractMethod,

    onEventInternal: function(event){
        if( event.isTempo() ){
            var data = event.get("data");
            var tempo = (((data[2]<<8)+data[3])<<8)+data[4];
            this.setTempo( tempo );
        }
    },

    onGetBufferInternal: function(length){
        goog.array.forEach(this._performers, function(p){
            p.setGetBuffer(length);
        });
    }

});

});