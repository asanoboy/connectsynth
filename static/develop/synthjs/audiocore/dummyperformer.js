goog.provide("synthjs.audiocore.DummyPerformer");
goog.require("synthjs.audiocore.PerformerBase");

goog.scope(function(){

var currentIndex = 0;

/**
 * Dummy Performer for ComposerWorker.
 * @constructor
 */
var Performer = synthjs.audiocore.DummyPerformer = function(){

    goog.base(this);
    this._wave = null;
    this._id = currentIndex++;

};
goog.inherits(Performer, synthjs.audiocore.PerformerBase);

goog.object.extend(Performer, {
    EventType: {
    }
});

goog.object.extend(Performer.prototype, {
    /**
     * Set DummyWavePlugin
     * @param {synthjs.audiocore.DummyWavePlugin} wave [description]
     */
    setWave: function(wave){
        this._wave = wave;
    },
    // getWave: function(){
    //     return this._wave;
    // },
    getBufferSequence: function(length){

    }

});


});