goog.provide("synthjs.ui.sequencer.TimelineBase");

goog.require("goog.ui.Component");

goog.scope(function(){

var TimelineBase = synthjs.ui.sequencer.TimelineBase = function(opt_domHelper){
    goog.base(this, opt_domHelper);

};

goog.inherits(TimelineBase, goog.ui.Component);

goog.object.extend(TimelineBase, {
    onResize: function(){

    }
});


});