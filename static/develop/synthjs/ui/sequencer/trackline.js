goog.provide("synthjs.ui.sequencer.Trackline");

goog.require("synthjs.ui.sequencer.TimelineBase");

goog.scope(function(){

/**
 * Number of notes in one octave.
 * @type {Number}
 */
var NOTE_NUM = 12;

/**
 * @constructor
 * @extends {synthjs.ui.sequencer.TimelineBase}
 * @param {goog.dom.DomHelper=} opt_domHelper [description]
 */
var Trackline = synthjs.ui.sequencer.Trackline = function(delta, miditrack, opt_domHelper){
    goog.base(this, opt_domHelper);
    this._miditrack = miditrack;
    this._height = 50;
    this._margin = 5;
    this._delta = delta;
    this._tick = 50;
    this._scaleElements = [];
    this._noteElements = [];
};

goog.inherits(Trackline, synthjs.ui.sequencer.TimelineBase);

goog.object.extend(Trackline, {
    // _WRAPPER_CLASSNMAE: "trackline-wrapper",
    _CONTENT_CLASSNAME: "trackline-content",
    createBase64BackgroundImage: function(width, alpha){
        var png = new PNGlib(width, 1, alpha);
        png.color(0,0,0,0);
        png.buffer[png.index(width-1, 0)] = png.color(0, 0, 0, alpha);
        return "data:image/png;base64,"+png.getBase64();
    }
});

goog.object.extend(Trackline.prototype, {
    // createDom: function(){
    //     this.setElementInternal(
    //         this.getDomHelper().createDom(
    //             'div',
    //             Trackline._WRAPPER_CLASSNAME));
    //     this.decorateInternal(this.getElement());
    // },
    decorateInternal: function(element){
        goog.base(this, "decorateInternal", element);
        var dom = this.getDomHelper();
        this._wrapperElement = dom.createDom(
            "div",
            Trackline._CONTENT_CLASSNAME);
        goog.style.setStyle(this._wrapperElement, {
            position: "relative"
        });
        goog.style.setHeight(this._wrapperElement, this._height);
        dom.appendChild(element, this._wrapperElement);
    },
    enterDocument: function(){
        this.drawScale();
        this.drawEvent();
    },
    onResize: function(){

    },
    // createDom: function(){
    //     goog.base(this, "createDom");

    //     goog.style.setWidth(this.getElement(), 10000);
    //     goog.style.setHeight(this.getElement(), 180);
    // },
    setWidth: function(width, opt_silent){
        var largerWidth = Math.max(this._width, width);
        goog.style.setWidth( this._wrapperElement, largerWidth );
        this.drawScale();
        goog.base(this, 'setWidth', largerWidth, opt_silent);
    },
    drawEvent: function(){
        var onEvents = {},
            validNotes = [],
            note;
        goog.array.forEach(
            this._miditrack.get("eventcollection").getAll(),
            function(event){
                if( !(event instanceof synthjs.model.MidiKeyEvent) ){
                    // console.log("OTHER EVENT");
                    // console.log(event);
                    return;
                }
                // console.log(event);
                // console.log(event.get("offset")+"; note="+event.get("note") +"; vel="+event.get("velocity"));
                // try{
                note = event.get("note");
                if( event.isOn() ){
                    if( note in onEvents ){
                        goog.asserts.fail("Invalid Midi track");
                    }
                    else {
                        onEvents[note] = event;
                    }
                }
                else {
                    if( note in onEvents ){
                        validNotes.push([onEvents[note], event]);
                        delete onEvents[note];
                    }
                    else {
                        goog.asserts.fail("Invalid Midi track");
                    }
                }
                // }
                // catch(e){
                //     console.log("ERROR");
                //     console.log(onEvents);
                //     throw e;
                // }
            }
        );

        var elem,
            dom = this.getDomHelper(),
            maxWidth=0,
            style = goog.style,
            left, width;
        goog.array.forEach(validNotes, function(e){
            elem = this._createEventElement(e[0], e[1]);
            dom.appendChild(this._wrapperElement, elem);
            width = parseInt(style.getStyle(elem, "width"), 10);
            left = parseInt(style.getStyle(elem, "left"), 10);
            if( maxWidth < width+left ){
                maxWidth = width+left;
            }
        },
        this);

        this.setWidth(maxWidth);
    },
    /**
     * Assumes 
     * @param  {synthjs.model.MidiKeyEvent} onEvent  Assumes to be NoteON
     * @param  {synthjs.model.MidiKeyEvent} offEvent Assumes to be NoteOFF
     * @return {[type]}          [description]
     */
    _createEventElement: function(onEvent, offEvent){
        var elem = this.getDomHelper().createDom(
            'div');
        var style = goog.style;
        var height = (this._height-this._margin*2)/NOTE_NUM;
        style.setWidth(elem,  (offEvent.get("offset")-onEvent.get("offset"))/this._delta*this._tick ) ;
        style.setHeight(elem, height);

        var top = (NOTE_NUM-1)-(onEvent.get("note")%(NOTE_NUM));
        top *= height;
        style.setStyle(elem, {
            backgroundColor: 'gray',
            position: "absolute",
            left: onEvent.get("offset")/this._delta*this._tick + 'px',
            top: top + 'px'
        });
        return elem;
    },
    drawScale: function(){
        var style = goog.style, dom = this.getDomHelper();
        style.setStyle(this._wrapperElement, {
            backgroundImage: "url("+Trackline.createBase64BackgroundImage(this._tick, 0x30)+")"
        });
    }
});

});
