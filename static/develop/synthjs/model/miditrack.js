goog.provide("synthjs.model.MidiTrack");
goog.provide("synthjs.model.MidiEvent");

goog.require("synthjs.model.MidiTrack");

/**
 * @constructor
 * @extends {synthjs.model.Base}
 */
synthjs.model.MidiTrack = function(){
	goog.base(this, {
		"delta": 0
	});
}
goog.inherits(synthjs.model.MidiTrack, synthjs.model.Base);
