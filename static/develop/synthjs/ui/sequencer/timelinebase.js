goog.provide("synthjs.ui.sequencer.TimelineBase");

goog.require("goog.ui.Component");

goog.scope(function(){

var TimelineBase = synthjs.ui.sequencer.TimelineBase = function(opt_domHelper){
    goog.base(this, opt_domHelper);

};

goog.inherits(TimelineBase, goog.ui.Component);

goog.object.extend(TimelineBase, {
    _ROOT_CLASSNAME: 'timeline-root'
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

    }
});


});