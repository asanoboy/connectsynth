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

	this._initializeListener();
};
goog.inherits(synthjs.model.MidiTrack, synthjs.model.Base);

synthjs.model.MidiTrack.prototype._initializeListener = function(){
	var EventType = synthjs.model.MidiTrack.EventType;
	this.getHandler().listen(
		this.get("eventcollection"),
		synthjs.model.Collection.EventType.ADD,
		function(e){
			this.dispatchEvent(
				new goog.events.Event(EventType.ADD_EVENT, e.target)
			);
		},
		this)
	.listen(
		this.get("eventcollection"),
		synthjs.model.Collection.EventType.REMOVE,
		function(e){
			this.dispatchEvent(
				new goog.events.Event(EventType.REMOVE_EVENT, e.target)
			);
		},
		this);
};

synthjs.model.MidiTrack.EventType = {
	ADD_EVENT: 'add-event',
	REMOVE_EVENT: 'remove-event',
	CHANGE_EVENT: 'change-event'
};



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

	this.getHandler().listen(
		event,
		synthjs.model.EventType.CHANGE,
		this.onChangeEvent,
		this);
};

synthjs.model.MidiTrack.prototype.onChangeEvent = function(e){
	this.dispatchEvent(
		new goog.events.Event(syntjs.model.MidiTrack.EventType.CHANGE_EVENT, e.target)
	);
};

synthjs.model.MidiTrack.prototype.removeEvent = function(event){
	this.get("eventcollection").remove(event);
	this.getHandler().unlisten(
		event,
		synthjs.model.EventType.CHANGE,
		this.onChangeEvent,
		this);
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
 * @param {number} velocity In range [0, 127] integer
 */
synthjs.model.MidiKeyEvent = function(status, offset, note, velocity){
	goog.asserts.assert(goog.isNumber(status));
	goog.asserts.assert((status & 0xf0)==0x80 || (status & 0xf0) ==0x90);
//	if ( (status & 0xf0) ==0x90 && velocity==0 ){
//		status = (status & 0x0f) | 0x80;
//	}
	goog.base(this, {
		"type": (status & 0xf0)==0x80 ? synthjs.model.MidiKeyEventType.OFF : synthjs.model.MidiKeyEventType.ON,
		"status": status,
		"offset": offset,
		"note": note,
		"velocity": velocity
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
synthjs.model.MidiOtherEvent = function(status, buffer){
	goog.base(this, {
		"offset": 0,
		"status": status,
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

synthjs.model.MidiMetaEvent.prototype.isTempo = function(){
	return this.get("data")[0]==0x51;
};

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