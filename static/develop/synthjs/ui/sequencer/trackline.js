goog.provide("synthjs.ui.sequencer.Trackline");

goog.require("synthjs.ui.sequencer.TimelineBase");

goog.scope(function(){

/**
 * @constructor
 * @extends {synthjs.ui.sequencer.TimelineBase}
 * @param {goog.dom.DomHelper=} opt_domHelper [description]
 */
var Trackline = synthjs.ui.sequencer.Trackline = function(opt_domHelper){
    goog.base(this, opt_domHelper);
};

goog.inherits(Trackline, synthjs.ui.sequencer.TimelineBase);

goog.object.extend(Trackline, {
    onResize: function(){

    }
});

});
