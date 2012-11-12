goog.provide("synthjs.audiocore.MidiInterface");
goog.provide("synthjs.audiocore.MidiInterface.EventType");

goog.require("goog.events.EventTarget");

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
synthjs.audiocore.MidiInterface = function(){
	goog.base(this);
	window.addEventListener(
		"message", 
		goog.bind(this.webMidiLinkRecv, this), 
		false);
	
}

goog.inherits(synthjs.audiocore.MidiInterface, goog.events.EventTarget);
goog.addSingletonGetter(synthjs.audiocore.MidiInterface);

synthjs.audiocore.MidiInterface.prototype.webMidiLinkRecv = function(event){
	var msg = event.data.split(",");
	switch (msg[0]) {
		case "midi":
			switch (parseInt(msg[1], 16) & 0xf0) {
				case 0x80:
					this.noteOff(parseInt(msg[2], 16));
					break;
				case 0x90:
					var velo = parseInt(msg[3], 16);
					if(velo > 0)
						this.noteOn(parseInt(msg[2], 16), velo);
					else
						this.noteOff(parseInt(msg[2], 16));
					break;
				case 0xb0:
					if(parseInt(msg[2], 16) == 0x78) {
						this.allSoundOff();
					}
					break;
			}
	}
}

synthjs.audiocore.MidiInterface.prototype.noteOn = function(num, opt_velo){
	
	var velo = opt_velo ? opt_velo : 1;
	var note = new synthjs.audiocore.Note.createByMidiFormat(num);
	
	this.dispatchEvent(
		new goog.events.Event(synthjs.audiocore.MidiInterface.EventType.ON, {
			note: note, velocity: velo
		})
	);
};

synthjs.audiocore.MidiInterface.prototype.noteOff = function(num){
	var note = new synthjs.audiocore.Note.createByMidiFormat(num);
	this.dispatchEvent(new goog.events.Event(synthjs.audiocore.MidiInterface.EventType.OFF, {note: note}));
};

synthjs.audiocore.MidiInterface.prototype.allSoundOff = function(){
	this.dispatchEvent(new goog.events.Event(synthjs.audiocore.MidiInterface.EventType.ALLOFF));
};

synthjs.audiocore.MidiInterface.EventType = {
	ON: 'note-on',
	OFF: 'note-off',
	ALLOFF: 'note-all-off'
};