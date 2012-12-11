function Instrument(){
	this.sampleRate = null;
	this.offsetRadian = 0;
	this.stepRadian = false;
}

Instrument.prototype.setSampleRate = function(sampleRate){
	this.sampleRate = sampleRate;
}

Instrument.prototype.onNote = function(note){
	this.stepRadian = 440 * Math.pow(2, (note / 12) - 5) * 2 * Math.PI / this.sampleRate;
}

Instrument.prototype.offNote = 
Instrument.prototype.offAllNote = function(){
	this.stepRadian = false;
}

Instrument.prototype.getBuffer = function(length){
	var buffer = new Float32Array(length);
	if(this.stepRadian !== false) {
		for(var i = 0; i < length; i++) {
			this.offsetRadian += this.stepRadian;
			buffer[i] = Math.sin(this.offsetRadian);
		}
	}
	return [buffer, buffer];	
}