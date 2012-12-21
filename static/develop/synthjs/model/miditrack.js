goog.provide("synthjs.model.MidiTrack");
goog.provide("synthjs.model.MidiEvent");

goog.require("synthjs.model.MidiTrack");

/**
 * @constructor
 * @extends {synthjs.model.Base}
 */
synthjs.model.MidiTrack = function(){
	goog.base(this, {
		"offset": 0
	});
}
goog.inherits(synthjs.model.MidiTrack, synthjs.model.Base);


/**
 * @constructor
 * @extends {synthjs.model.Base}
 */
synthjs.model.MidiEventBase = goog.nullFunction;
goog.inherits(synthjs.model.MidiEventBase, synthjs.model.Base);

/**
 * @constructor
 * @param {number} type Corresponds to MIDI format. ex. 0x80 means OFF event. 
 * @param {number} offset Unit is one of 'delta' in MIDI format.
 * @param {number} note In range [0, 127] integer
 * @param {number} verocity In range [0, 127] integer
 */
synthjs.model.MidiEvent = function(type, offset, note, verocity){
	goog.base(this, {
		"type": type,
		"offset": offset,
		"note": note,
		"verocity": verocity
	});
}
goog.inherits(synthjs.model.MidiEvent, synthjs.model.MidiEventBase);

synthjs.model.MidiEventType = {
	ON: 0x80,
	OFF: 0x90
}

/**
 * @constructor
 * @param {number} type Corresponds to MIDI format.
 * @param {Uint8Array} data 
 */
synthjs.model.MidiMetaEvent = function(type, data){
	goog.base(this, {
		"type": type,
		"data": data
	});
}
