importScripts("controller.js");
importScripts("operator.js");
importScripts("operatorcontroller.js");

function Instrument(){
	this.wave = new OperatorController();
}

Instrument.prototype.setSampleRate = function(sampleRate){
	this.wave.setSampleRate(sampleRate);
}

Instrument.prototype.getBackground = function(){
	return controller.background;
}

Instrument.prototype.getControlList = function(){
	return controller.controls;
}

Instrument.prototype.setValue = function(id, value){
	if( (mat=id.match(/^ope([\d]+)_([a-z]+)$/)) ){
		var opeIndex = mat[1];
		var suffix = mat[2];
		switch(suffix){
			case 'a':
			case 'd':
			case 'r':
				this.wave.setOperatorEnvelope(opeIndex, suffix, value);
				break;
			case 's':
				this.wave.setOperatorEnvelope(opeIndex, suffix, value/100);
				break;
			case 'oct':
				this.wave.setOperatorOctave(opeIndex, value);
				break;
			case 'fac':
				this.wave.setOperatorFactor(opeIndex, value/100);
		}
	}
	else if( (mat=id.match(/^car([\d]+)_(mod([\d]+)|out)$/)) ){
		switch(mat[2]){
			case 'out':
				this.wave.setOutput(mat[1], value);
				break;
			case 'mod0':
			case 'mod1':
			case 'mod2':
			case 'mod3':
				this.wave.setParameter(mat[1], mat[3], value);
				break;
		}
	}
	else if( id=='vol' ){
		this.wave.setVolume(value);
	}
}


Instrument.prototype.getBuffer = function(length){
	var buffer = this.wave.getBuffer(length);
	return [buffer, buffer];	
}

Instrument.prototype.onNote = function(note, verocity){
	this.wave.addEvent("noteon", note, verocity);
}

Instrument.prototype.offNote = function(note){
	this.wave.addEvent("noteoff", note);
} 

Instrument.prototype.offAllNote = function(){
	this.wave.addEvent("notealloff");
}
