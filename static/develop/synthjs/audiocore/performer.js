goog.provide("synthjs.audiocore.Performer");

/**
 * Performs synthjs.model.MidiTrack
 * @constructor
 */
synthjs.audiocore.Performer = function(){
	this._track;
}

/**
 * Sets track.
 * @param {synthjs.model.MidiTrack} track [description]
 */
synthjs.audiocore.Performer.prototype.setTrack = function(track) {
	this._track = track;
};