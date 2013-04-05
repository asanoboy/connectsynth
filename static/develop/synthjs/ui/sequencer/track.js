goog.provide("synthjs.ui.sequencer.Track");

goog.require("synthjs.utility.EventTarget");

goog.scope(function(){

var Track = synthjs.ui.sequencer.Track = function(){

};

goog.inherits(Track, synthjs.utility.EventTarget);

goog.object.extend(Track, {
    render: function(){
    }
});
});