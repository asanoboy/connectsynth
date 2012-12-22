goog.provide("synthjs.model.MidiTrack");
goog.provide("synthjs.model.MidiEvent");

goog.require("synthjs.model.Collection");
goog.require("synthjs.model.MidiTrack");

/**
 * @constructor
 * @extends {synthjs.model.Base}
 */
synthjs.model.MidiTrack = function(){
	goog.base(this, {
		"offset": 0,
		"eventcollection":  new synthjs.model.Collection(synthjs.model.MidiEventBase)
	});
}
goog.inherits(synthjs.model.MidiTrack, synthjs.model.Base);

/**
 * @param {synthjs.model.MidiEventBase} event
 */
synthjs.model.MidiTrack.prototype.addEvent = function(event) {
	this.get("eventcollection").add(event);
};

/**
 * @constructor
 * @extends {synthjs.model.Base}
 */
synthjs.model.MidiEventBase = function(){
	goog.base(this, arguments[0]);
};
goog.inherits(synthjs.model.MidiEventBase, synthjs.model.Base);

/**
 * @constructor
 * @param {number} status Corresponds to MIDI format. ex. 0x80 means OFF event. 
 * @param {number} offset Unit is one of 'delta' in MIDI format.
 * @param {number} note In range [0, 127] integer
 * @param {number} verocity In range [0, 127] integer
 */
synthjs.model.MidiEvent = function(status, offset, note, verocity){
	goog.asserts.assert(goog.isNumber(status));
	goog.base(this, {
		"status": status,
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
	goog.asserts.assert(goog.isNumber(type));
	goog.base(this, {
		"offset": 0,
		"type": type,
		"data": data
	});
}
goog.inherits(synthjs.model.MidiMetaEvent, synthjs.model.MidiEventBase);

/**
 * @constructor
 * @param {Uint8Array} data 
 */
synthjs.model.MidiSysExEvent = function(data){

	goog.base(this, {
		"offset": 0,
		"data": data
	});
}
goog.inherits(synthjs.model.MidiSysExEvent, synthjs.model.MidiEventBase);
