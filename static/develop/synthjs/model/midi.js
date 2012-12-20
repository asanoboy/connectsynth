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
		track, trackdata, delta;
	
	for( var i=0; i<midifile.getTrackNum(); i++ ){
		track = new synthjs.model.MidiTrack();
		trackdata = midifile.getTrack(i);
		for( var j=0; j<trackdata.getEventNum(); j++ ){
			delta = trackdata.getEventDelta(j);
			goog.asserts.assertNumber(delta);
			track.set("delta", delta);
		}
		midi.addTrack(track);
	}
	
	
	//TODO:
	return midi;
}

/**
 * @constructor
 * @extends {synthjs.model.MidiTrackCollection}
 */
synthjs.model.MidiTrackCollection = function(){
	goog.base(this, synthjs.model.MidiTrack);
}

goog.inherits(synthjs.model.MidiTrackCollection, synthjs.model.Collection);