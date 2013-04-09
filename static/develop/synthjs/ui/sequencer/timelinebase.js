goog.provide("synthjs.ui.sequencer.TimelineBase");

goog.require("goog.ui.Component");

goog.scope(function(){

var TimelineBase = synthjs.ui.sequencer.TimelineBase = function(opt_domHelper){
    goog.base(this, opt_domHelper);

    this._width = 0;
};

goog.inherits(TimelineBase, goog.ui.Component);

goog.object.extend(TimelineBase, {
    _ROOT_CLASSNAME: 'timeline-root',
    EventType: {
        RESIZE: "timeline-resize"
    }
});

goog.object.extend(TimelineBase.prototype, {

    createDom: function(){
        this.setElementInternal(
            this.getDomHelper().createDom(
                'div',
                TimelineBase._ROOT_CLASSNAME));
        this.decorateInternal(this.getElement());
    },
    onResize: function(){

    },
    setWidth: function(width, opt_silent){
        this._width = width;
        if( !opt_silent ){
            // this.dispatchEvent(new goog.events.Event(TimelineBase.EventType.RESIZE));
        }
    },
    getWidth: function(){
        return this._width;
    },
    drowScale: function(){}
});


});