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
};
goog.inherits(synthjs.model.MidiTrack, synthjs.model.Base);

/**
 * @param {synthjs.model.MidiEventBase} event
 */
synthjs.model.MidiTrack.prototype.addEvent = function(event) {
	if( goog.isArray(event) ){
		goog.array.forEach(event, function(e){
			this.get("eventcollection").add(e);
		}, this);
	}
	else {
		this.get("eventcollection").add(event);
	}

	this.get("eventcollection").sort(function(a, b){
		return a.get('offset') - b.get('offset');
	});
};

synthjs.model.MidiTrack.prototype.hasKeyEvent = function(){
	var events = this.get("eventcollection").getAll();
	return goog.array.find(events, function(e){
		return e instanceof synthjs.model.MidiKeyEvent;
	}) ? true : false;
};

/**
 * Returns event object or false.
 * @param  {number} index
 * @return {synthjs.model.MidiEventBase}
 */
synthjs.model.MidiTrack.prototype.getEvent = function(index){
	return this.get("eventcollection").getByIndex(index);
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
synthjs.model.MidiKeyEvent = function(status, offset, note, verocity){
	goog.asserts.assert(goog.isNumber(status));
	goog.asserts.assert((status & 0xf0)==0x80 || (status & 0xf0) ==0x90);
//	if ( (status & 0xf0) ==0x90 && verocity==0 ){
//		status = (status & 0x0f) | 0x80;
//	}
	goog.base(this, {
		"type": (status & 0xf0)==0x80 ? synthjs.model.MidiKeyEventType.OFF : synthjs.model.MidiKeyEventType.ON,
		"status": status,
		"offset": offset,
		"note": note,
		"verocity": verocity
	});
};
goog.inherits(synthjs.model.MidiKeyEvent, synthjs.model.MidiEventBase);

synthjs.model.MidiKeyEventType = {
	ON: 0x90,
	OFF: 0x80
};

/**
 * Represents MIDI event exclude MidiKeyEvent.
 * @constructor
 * @extends {synthjs.model.MidiEventBase}
 */
synthjs.model.MidiOtherEvent = function(buffer){
	goog.base(this, {
		"offset": 0,
		"buffer": buffer
	});
};
goog.inherits(synthjs.model.MidiOtherEvent, synthjs.model.MidiEventBase);

/**
 * @constructor
 * @param {number} type Corresponds to MIDI format.
 * @param {Uint8Array} data hoge
 */
synthjs.model.MidiMetaEvent = function(type, data){
	goog.asserts.assert(goog.isNumber(type));
	goog.base(this, {
		"offset": 0,
		"type": type,
		"data": data
	});
};
goog.inherits(synthjs.model.MidiMetaEvent, synthjs.model.MidiEventBase);

/**
 * @constructor
 * @param {Uint8Array} data fuga
 */
synthjs.model.MidiSysExEvent = function(data){

	goog.base(this, {
		"offset": 0,
		"data": data
	});
};
goog.inherits(synthjs.model.MidiSysExEvent, synthjs.model.MidiEventBase);