goog.provide("synthjs.application.Sequencer");

goog.require("synthjs.application.Base");
goog.require("synthjs.ui.sequencer.Container");


goog.require("synthjs.model.Midi");

goog.scope(function(){


var Sequencer = synthjs.application.Sequencer = function(id){
    goog.base(this, id);

    var delta = 4800;
    this._midi = new synthjs.model.Midi(delta);
};

goog.inherits(Sequencer, synthjs.application.Base);

Sequencer.prototype._init = function(){
    this._getBodyComponent().listenMidi(this._midi);
    this._listenContainer();
};

Sequencer.prototype._getMenuComponent = function(){
    return synthjs.ui.MenuBar.createFromSetting(
        [
            {label:"File", sublist: [
                {label:'Save', callback: function(){}},
                {label:'Import', callback: function(){}},
                {label:'Exort', callback: function(){}}
            ]}
        ]
    );
};

Sequencer.prototype._getBodyComponent = function(){
    return this._bodyComponent ||
        ( this._bodyComponent=new synthjs.ui.sequencer.Container());
};

Sequencer.prototype._listenContainer = function(){
    var EventType = synthjs.ui.sequencer.Container.EventType;
    var container = this._getBodyComponent();

    goog.array.forEach([
        // Track Events
            [
                EventType.ADD_TRACK,
                this.addTrack
            ],
            [
                EventType.REMOVE_TRACK,
                this.removeTrack
            ],
            [
                EventType.CHANGE_TRACK_VOLUME,
                this.changeTrackVolume
            ],
            [
                EventType.CHANGE_TRACK_VOLUME_BALANCE,
                this.changeTrackVolumeBalance
            ],
            [
                EventType.CHANGE_TRACK_DESCRIPTION,
                this.changeTrackDescription
            ],
            [
                EventType.OPEN_INSTRUMENT,
                this.openInstrument
            ],
            [
                EventType.OPEN_MIDI_EDITOR,
                this.openMidiEditor
            ],

        // Tempo Track Event
            [
                EventType.OPEN_TEMPO_EDITOR,
                this.openTempoEditor
            ],


        // Player Events
            [
                EventType.CHANGE_VOLUME,
                this.changeVolume
            ],
            [
                EventType.CHANGE_VOLUME_BALANCE,
                this.changeVolumeBalance
            ],
            [
                EventType.ON_START,
                this.onStart
            ],
            [
                EventType.ON_STOP,
                this.onStop
            ],
            [
                EventType.ON_PAUSE,
                this.onPause
            ]
        ],
        function(e){
            this.getHandler().listen(
                container,
                e[0],
                e[1],
                this);
        },
        this
    );
};

Sequencer.prototype.addTrack = function(event){
};

Sequencer.prototype.removeTrack = function(event){
};

Sequencer.prototype.changeTrackVolume = function(event){
};

Sequencer.prototype.changeTrackVolumeBalance = function(event){
};

Sequencer.prototype.changeTrackDescription = function(event){
};

Sequencer.prototype.openInstrument = function(event){
};

Sequencer.prototype.openMidiEditor = function(event){
};

Sequencer.prototype.openTempoEditor = function(event){
};

Sequencer.prototype.changeVolume = function(event){
};

Sequencer.prototype.changeVolumeBalance = function(event){
};

Sequencer.prototype.onStart = function(event){
};

Sequencer.prototype.onStop = function(event){
};

Sequencer.prototype.onPause = function(event){
};

});