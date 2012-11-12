goog.provide('synthjs.audiocore.Note');

goog.require('goog.array');

/** @constructor */
synthjs.audiocore.Note = function(basenote, level, opt_base){
	this.basefreq = opt_base ? opt_base : 440;
	
	if( synthjs.audiocore.Note.dupnotes[basenote] ) basenote = synthjs.audiocore.Note.dupnotes[basenote];
	if( !goog.array.find(synthjs.audiocore.Note.notes, function(e){return e==basenote;}) ) {
		throw new Error("Can't create Note because of invalid parameters: "+basenote);
	}
	
	this.note = basenote;
	this.level = level;
    this.freq = this.basefreq * Math.pow(2, goog.array.indexOf(synthjs.audiocore.Note.notes, basenote)/12+level);
    this.isWhite = /^[a-g]$/.test(basenote); 
};

synthjs.audiocore.Note.prototype.getNext = function(opt_forward){
 	var forward = opt_forward ? true : false,
		level, note;
	
	if( forward && this.note==='b' ){
		level = this.level+1;
		note = 'c';

	}
	else if( !forward && this.note==='c' ){
		level = this.level-1;
		note = 'b';
	}
	else {
		level = this.level;
		if( forward ){
			note = synthjs.audiocore.Note.notes[goog.array.indexOf(synthjs.audiocore.Note.notes, this.note)+1];
		} else {
			note = synthjs.audiocore.Note.notes[goog.array.indexOf(synthjs.audiocore.Note.notes, this.note)-1];
		}
	}
	
	return new synthjs.audiocore.Note(note, level, this.basefreq);
}

synthjs.audiocore.Note.prototype.getFreq = function(){
	return this.freq;
}

/**
 * @param {synthjs.audiocore.Note}
 * @return {boolean}
 */
synthjs.audiocore.Note.prototype.equals = function(note){
	return note.getFreq() === this.getFreq();
}

/**
 * @param {string} included synthjs.audiocore.Note.dupnotes or synthjs.audiocore.Note.notes
 * @param {number} 0 means a level of C4
 */
synthjs.audiocore.Note.create = function(note, level, opt_base){
	var n = new synthjs.audiocore.Note(note, level, opt_base);
	return n.note ? n : false;
};

/**
 * @param {string} str Same format as return of synthjs.audiocore.Note.prototype.getString()
 * @param {number} 0 means a level of C4
 */
synthjs.audiocore.Note.createByString = function(str, opt_base){
	var pos = str.indexOf("|"),
		level = str.slice(0, pos),
		note = str.slice(pos+1);
	
	var n = new synthjs.audiocore.Note(note, parseInt(level), opt_base);
	if( !n ){
		throw new Error("invalid strings");
	}
	return n.note ? n : false;
};

/**
 * @param {number} num integer
 */
synthjs.audiocore.Note.createByMidiFormat = function(num){
	var noteNum = num % 12,
		octaveNum = parseInt(num/12) - 5;
	var note = new synthjs.audiocore.Note(synthjs.audiocore.Note.notes[noteNum], octaveNum);
	return note;
};

synthjs.audiocore.Note.prototype.getString= function(){
	return this.level+"|"+this.note;
}

synthjs.audiocore.Note.prototype.getMidiNum= function(){
	var index = goog.array.findIndex( 
		synthjs.audiocore.Note.notes, 
		function(s){
			return s==this.note;
		}, this);
	
	goog.asserts.assert(goog.isNumber(index), "Invalid note strings");
	return (this.level+5)*12 + index;
}

/** @const */
synthjs.audiocore.Note.dupnotes = {'d-':'c+', 'e-':'d+', 'g-':'f+', 'a-':'g+', 'b-':'a+'};

/** @const */
synthjs.audiocore.Note.notes = ['c','c+','d','d+','e','f','f+','g','g+','a','a+','b'];

/** @const */
synthjs.audiocore.Note.defaultSampleRate = 48000;