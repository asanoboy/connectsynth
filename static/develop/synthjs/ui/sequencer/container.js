goog.provide("synthjs.ui.sequencer.Container");

goog.require("goog.ui.Component");
goog.require("goog.object");
// goog.require('goog.fx.AnimationQueue');
// goog.require('goog.fx.dom');
// goog.require("goog.fx");

goog.require("synthjs.model.Midi.EventType");

goog.scope(function(){

    var createDom = goog.dom.createDom,
        style = goog.style,
        classes = goog.dom.classes;

    var Container = synthjs.ui.sequencer.Container = function(opt_domHelper){
        goog.base(this, opt_domHelper);
        this._slideWidth = 150;

        this._bottomHeight = 50;

        this._trackList = [];
    };

    goog.inherits(Container, goog.ui.Component);

    goog.object.extend(Container, {
        WRAPPER_CLASSNAME: 'sequencer-container-wrapper',
        SLIDEBODY_CLASSNAME: 'sequencer-container-slidebody',
        LEFTPANE_CLASSNAME: 'sequencer-container-liftpane',
        BOTTOMPANE_CLASSNAME: 'sequencer-container-bottompane'

    });

    goog.object.extend(Container.prototype, {

        /**
         * Adds synthjs.ui.sequencer.Track
         * @param {synthjs.ui.sequencer.Track} track [description]
         */
        addTrack: function(track){
        },
        removeTrack: function(){

        },
        addMidiEvent: function(){

        },
        removeMidiEvent: function(){

        },
        changeMidiEvent: function(){

        },
        addTempoEvent: function(){

        },
        removeTempoEvent: function(){

        },
        changeTempoEvent: function(){

        },
        /**
         * Litens midi
         * @param  {synthjs.model.Midi} midi [description]
         * @return {[type]}      [description]
         */
        listenMidi: function(midi){
            var EventType = synthjs.model.Midi.EventType;

            goog.array.forEach([
                    [
                        EventType.ADD_TRACK,
                        this.addTrack
                    ],
                    [
                        EventType.REMOVE_TRACK,
                        this.removeTrack
                    ],
                    [
                        EventType.ADD_MIDIEVENT,
                        this.addMidiEvent
                    ],
                    [
                        EventType.REMOVE_MIDIEVENT,
                        this.removeMidiEvent
                    ],
                    [
                        EventType.CHANGE_MIDIEVENT,
                        this.changeMidiEvent
                    ],
                    [
                        EventType.ADD_TEMPOEVENT,
                        this.addTempoEvent
                    ],
                    [
                        EventType.REMOVE_TEMPOEVENT,
                        this.removeTempoEvent
                    ],
                    [
                        EventType.CHANGE_TEMPOEVENT,
                        this.changeTempoEvent
                    ]
                ],
                function(e){
                    this.getHandler().listen(
                        this,
                        e[0],
                        e[1]);
                },
                this
            );
        },
        createDom: function(){
            var elem = createDom('div', Container.WRAPPER_CLASSNAME);
            style.setStyle(elem,
                {
                    "position": "relative"
                });

            this._body = createDom('div',
                Container.SLIDEBODY_CLASSNAME);
            style.setStyle(this._body,
                {
                    "position": 'absolute',
                    "z-index": 10,
                    'background-color': 'pink'
                });
            this._leftpane = createDom('div',
                Container.LEFTPANE_CLASSNAME);

            style.setStyle(this._leftpane,
                {
                    "position": 'absolute',
                    'background-color': 'blue',
                    "width": this._slideWidth+"px"
                });
            var dom = this.getDomHelper();

            this._bottompane = createDom('div',
                Container.BOTTOMPANE_CLASSNAME);
            style.setStyle(this._bottompane,
                {
                    "position": 'absolute',
                    "background-color": 'gray',
                    "height": this._bottomHeight + "px"
                });

            dom.appendChild(elem, this._leftpane);
            dom.appendChild(elem, this._body);
            dom.appendChild(elem, this._bottompane);

            this.setElementInternal(elem);
        },

        enterDocument: function(){
            goog.base(this, 'enterDocument');
            // setTimeout(goog.bind(function(){
            //     this.open();
            // }, this), 1000) ;
        },

        // disposeInternal: function(){
        //     goog.base(this, "disposeInternal");
        // },

        setLeftPane: function(component){
            var dom = this.getDomHelper();

            if( !component.getElement() ){
                component.createDom();
            }
            this._leftpaneComponent = component;
            dom.removeChildren(this._leftpane);
            dom.appendChild(this._leftpane, component.getElement());
        },

        onResize: function(size){
            style.setBorderBoxSize(
                this.getElement(),
                size);

            style.setBorderBoxSize(
                this._body,
                new goog.math.Size(
                    size.width - this._slideWidth,
                    size.height - this._bottomHeight
                ));
            style.setPosition(
                this._body,
                this._slideWidth,
                0);


            style.setBorderBoxSize(
                this._leftpane,
                new goog.math.Size(
                    this._slideWidth,
                    size.height - this._bottomHeight
                ));
            // style.setPosition(
            //     this._leftpane,
            //     0, 0);

            style.setBorderBoxSize(
                this._bottompane,
                new goog.math.Size(
                    size.width,
                    this._bottomHeight
                ));
            style.setPosition(
                this._bottompane,
                0,
                size.height - this._bottomHeight);
        }
    });


    Container.EventType = {
        ADD_TRACK: "add-track",
        REMOVE_TRACK: "remove-track",
        CHANGE_TRACK_VOLUME: "change-track-volume",
        CHANGE_TRACK_VOLUME_BALANCE: "change-track-volume-balance",
        CHANGE_TRACK_DESCRIPTION: "change-track-description",
        OPEN_INSTRUMENT: "open-instrument",
        OPEN_MIDI_EDITOR: "open-midi-editor",
        OPEN_TEMPO_EDITOR: "open-tempo-editor",
        CHANGE_VOLUME: "change-volume",
        CHANGE_VOLUME_BALANCE: "change-volume-balance",
        ON_START: "on-start",
        ON_STOP: "on-stop",
        ON_PAUSE: "on-pause"
    };
});