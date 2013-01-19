
/** @constructor */
var Instrument = function(){
	this._singingNotes = [];

	this._removedNotes = [];
	this._num = Math.random();
};

/**
 * @private
 */
Instrument.prototype.setSampleRate = function(sampleRate){
	this._sampleRate = sampleRate;
};

Instrument.prototype.onNote = function(id, vel){
	this.addEvent({type: 'noteon', note: id, velocity: vel});
};

Instrument.prototype.offNote = function(id){
	this.addEvent({type: 'noteoff', note: id});
};

Instrument.prototype.addEvent = function(event){
	// postMessage("type="+event.type+"; note="+event.note+"; vel="+event.velocity);
	if( event.type=='noteon' && event.velocity>0 ){
		var exists = false;
		for( var i=0; i<this._singingNotes.length; i++){
			if( this._singingNotes[i].note == event.note ){
				exists = true;
				break;
			}
		}

		if( exists ){
			var newRemovedNotes = [];
			for( var j=0; j<this._removedNotes.length; j++){
				if( event.note != this._removedNotes[j].note ){
					newRemovedNotes.push(this._removedNotes[j]);
				}
			}

			this._removedNotes = newRemovedNotes;
		}
		else {
			this._singingNotes.push({
				radianPerSample: 440 * Math.pow(2, event.note/12-5) / this._sampleRate * 2 * Math.PI,
				note: event.note,
				offsetRadian: 0,
				velocity: 0,
				topVelocity: event.velocity
			});
		}
	}
	else if( event.type=='noteoff' || (event.type=='noteon' && event.velocity===0) ){
		this._removedNotes.push({
			note: event.note,
			isRemoved: false
		});
	}
	else if( event.type=='notealloff' ){
		this._singingNotes = [];
	}
};

Instrument.prototype.getBuffer = function(len){
	var arr = new Float32Array(len), theta, lastAmp, amp, isRemoved, note;
	
	// postMessage(this._singingNotes.length);
	for( var i=0; i<this._singingNotes.length; i++ ){
		note = this._singingNotes[i];
		isRemoved = false;
		for( var m=0; m<this._removedNotes.length; m++){
			if( note.note==this._removedNotes[m].note ){
				isRemoved = true;
				break;
			}
		}

		for( var j=0; j<len; j++ ){
			theta = note.radianPerSample * j + note.offsetRadian;
			amp = Math.sin(theta);
			if( isRemoved ){
				note.velocity -= 0.01;
				if(  note.velocity < 0 ){
					this._removedNotes[m].isRemoved = true;
					break;
				}
			}
			else if(note.velocity < note.topVelocity){
				note.velocity += 0.01;

				if( note.velocity > note.topVelocity ){
					note.velocity = note.topVelocity;
				}
			}
			arr[j] += 0.1 * note.velocity * amp;
		}
		note.offsetRadian += note.radianPerSample * len;

	}

	var newNotes = [], newRemovedNotes = [];
	for( i=0; i<this._singingNotes.length; i++ ){
		isRemoved = false;
		for( j=0; j<this._removedNotes.length; j++ ){
			if( this._removedNotes[j].isRemoved && this._removedNotes[j].note==this._singingNotes[i].note ){
				isRemoved = true;
				break;
			}
		}
		if( !isRemoved ){
			newNotes.push(this._singingNotes[i]);
		}
	}
	for( i=0; i<this._removedNotes.length; i++ ){
		if( !this._removedNotes[i].isRemoved ){
			newRemovedNotes.push(this._removedNotes[i]);
		}
	}
	this._singingNotes = newNotes;
	this._removedNotes = newRemovedNotes;
	
	
	return [arr, arr];
};
