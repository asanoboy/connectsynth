goog.provide("synthjs.audiocore.DummyPerformer");
goog.require("synthjs.audiocore.PerformerBase");
goog.require("synthjs.audiocore.DummyWavePlugin");

goog.require("synthjs.audiocore.ComposerSequence");

goog.scope(function(){


/**
 * Dummy Performer for ComposerWorker.
 * @constructor
 */
var Performer = synthjs.audiocore.DummyPerformer = function(){

    goog.base(this);
    this._wave = null;
    this._sequence = new synthjs.audiocore.ComposerSequence();
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
        if( this._wave ){
            this.getHandler().unlisten(
                this._wave,
                synthjs.audiocore.DummyWave.EventType.CHANGE_PARAM);
            this._sequence.pushRemoveWave(this._wave.getId());
            this._wave.dispose();
            this._wave = null;
        }
        this._wave = wave;

        this.getHandler().listen(
            this._wave,
            synthjs.audiocore.DummyWavePlugin.EventType.CHANGE_PARAM,
            this.onChangeWaveParam,
            this);
        this._sequence.pushCreateWave(
            this._wave.getId(),
            this._wave.getUrl(),
            this._wave.getSampleRate());
    },

    onChangeWaveParam: function(e){
        this._sequence.pushSetWaveParam(this._wave.getId(), e.target.name, e.target.value);
    },
    // getWave: function(){
    //     return this._wave;
    // },
    setGetBuffer: function(length){
        goog.asserts.assert( !!this._wave );

        // this._sequence = new synthjs.audiocore.ComposerSequence();

        if( this._track.getEvent(this._currentEventIndex)===false ){
            this._eof = true;

            this._sequence.pushGetBuffer(this._wave.getId(), length);
            return;
        }

        this.getBufferDeferredInternal(length);

        // var seq = this._sequence;
        // return seq;
    },

    getSequence: function(){
        return this._sequence;
    },

    flushSequence: function(){
        this._sequence = new synthjs.audiocore.ComposerSequence();
    },

    onEventInternal: function(event){
        if( event instanceof synthjs.model.MidiKeyEvent ){
            switch(event.get("type")){
                case synthjs.model.MidiKeyEventType.ON:
                    this._sequence.pushNoteOn(this._wave.getId(), event.get("note"), event.get("velocity"));
                    break;
                case synthjs.model.MidiKeyEventType.OFF:
                    this._sequence.pushNoteOff(this._wave.getId(), event.get("note"), event.get("velocity"));
                    break;
            }
        }
    },

    onGetBufferInternal: function(length){
        this._sequence.pushGetBuffer(this._wave.getId(), length);
    }

});
});