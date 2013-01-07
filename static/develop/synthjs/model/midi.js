goog.provide("synthjs.model.Midi");

goog.require("goog.asserts");
goog.require("synthjs.model.MidiTrack");
goog.require("synthjs.model.Base");
goog.require("synthjs.model.Collection");

/**
 * @constructor
 * @extends{synthjs.model.Base}
 */
synthjs.model.Midi = function(delta){
	goog.base(this, {
		"delta": delta,
		"tracks": new synthjs.model.MidiTrackCollection() 
	});
}
goog.inherits(synthjs.model.Midi, synthjs.model.Base);

/**
 * @param {synthjs.model.MidiTrack} track
 */
synthjs.model.Midi.prototype.addTrack = function(track){
	this.get("tracks").add(track);
}

/**
 * @param {synthjs.encode.MidiFile}
 * @return {synthjs.model.Midi|boolean}
 */
synthjs.model.Midi.createByMidiFile = function(midifile){
	var buffer = midifile.getHeader();
	var midi = new synthjs.model.Midi(midifile.getHeaderDelta()),
		track, trackdata, delta, eventdata, event;
	
	
	for( var i=0; i<midifile.getTrackNum(); i++ ){
		track = new synthjs.model.MidiTrack();
		trackdata = midifile.getTrack(i);
		var offset = 0, lastStatus = null;
		var events = [];
		for( var j=0; j<trackdata.getEventNum(); j++ ){
			delta = trackdata.getEventDelta(j);
			goog.asserts.assertNumber(delta);
			eventdata = trackdata.getEventData(j);
			goog.asserts.assert(eventdata instanceof Uint8Array);

			event = synthjs.model.Midi.createEventByBuffer(eventdata, lastStatus);
			goog.asserts.assert(event instanceof synthjs.model.MidiEventBase);
			
			offset += delta;
			event.set("offset", offset);
			//track.addEvent(event);
			events.push(event);

			if( event instanceof synthjs.model.MidiKeyEvent || event instanceof synthjs.model.MidiOtherEvent ){
				lastStatus = event.get("status");
			}

		}
		track.addEvent(events);
		midi.addTrack(track);
	}
	
	//TODO:
	return midi;
};

/**
 * @param {Uint8Array} buffer
 * @param {number} opt_prevStatus Uses for runnning status in Midi format.
 */
synthjs.model.Midi.createEventByBuffer = function(buffer, opt_prevStatus){
	if( buffer[0]==0xf0 || buffer[0]==0xf7 ){
		return new synthjs.model.MidiSysExEvent(buffer);
	}
	else if( buffer[0]==0xff ){
		return new synthjs.model.MidiMetaEvent(buffer[0], buffer.subarray(1));
	}
	else {
		var status = opt_prevStatus,
			needle = 0;
		if( buffer[0] & 0x80 ){
			status = buffer[0];
			needle++;
		}
		switch(status & 0xf0 ){
			case 0x80:
			case 0x90:
				var note = buffer[needle++];
				var velocity = buffer[needle++];
				goog.asserts.assertNumber(note);
				goog.asserts.assertNumber(velocity);
				return new synthjs.model.MidiKeyEvent(
					status,
					0,
					note,
					velocity);
			default:
				return new synthjs.model.MidiOtherEvent(buffer);
		}
	}
};
/**
 * @constructor
 * @extends {synthjs.model.MidiTrackCollection}
 */
synthjs.model.MidiTrackCollection = function(){
	goog.base(this, synthjs.model.MidiTrack);
};

goog.inherits(synthjs.model.MidiTrackCollection, synthjs.model.Collection);