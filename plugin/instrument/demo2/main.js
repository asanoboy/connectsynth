function Instrument(){
	this.sampleRate = null;
	this.offsetRadian = 0;
	this.stepRadian = false;
	this.oscillator = Math.sin;
	this.targetRadian = false;
	this.glideRadian = false;
	this.lastRadian = false;
	this.glideSecond = 0.05;
	this.glideRangeSecond = 0.01;
	this.volume=0.5;
	this.glide=0;
	this.removedAt=0;
}

Instrument.prototype.setSampleRate = function(sampleRate){
	this.sampleRate = sampleRate;
}

Instrument.prototype.getBackground = function(){
	return {
		image: 'img/background.png',
		height: 248,
		width: 360
	}	
}

Instrument.prototype.getControlList = function(){
	return [
		{
			type : "knob",
			id : "volume",
			value : 0.5,
			height : 120,
			width : 120,
			image : 'img/volume.png',
			min : 0,
			max : 1,
			step : 0.001,
			offsetx : 56,
			offsety : 95
		}, 
		{
			type : "radio",
			id : "oscillator",
			height : 24,
			width : 24,
			value : 0,
			imageon : "img/on.png",
			imageoff : "img/off.png",
			offsets : [
				{offsetx : 56, offsety : 48}, 
				{offsetx : 128, offsety : 48}, 
				{offsetx : 200, offsety : 48}, 
				{offsetx : 272, offsety : 48}
			]
		}, 
		{
			type : "toggle",
			id : "glide",
			height : 24,
			width : 24,
			value : 0,
			imageon : "img/on.png",
			imageoff : "img/off.png",
			offsetx : 240,
			offsety : 144
		
		}
	];
}

Instrument.prototype.setValue = function(id, value){
	if( id == 'oscillator' ){
		switch(value){
			case 0:
				this.oscillator=Math.sin;
				break;
			case 1:
				this.oscillator=triangle;
				break;
			case 2:
				this.oscillator=square;
				break;
			case 3:
				this.oscillator=sawtooth;
				break;
		}
	}
	else if( id == 'volume' ){
		this.volume = value; 
	}
	else if( id == 'glide' ){
		this.glide = value;
	}	
}

Instrument.prototype.onNote = function(note){
	var freq = 440 * Math.pow(2, (note / 12) - 5) * 2 * Math.PI;
	this.targetRadian = freq / this.sampleRate;
	if( this.glide && this.removedAt < this.glideRangeSecond*this.sampleRate && this.lastRadian ){
		this.glideRadian = (this.targetRadian - this.lastRadian) / (this.glideSecond * this.sampleRate);
		this.stepRadian = this.lastRadian; 
	}
	else {
		this.stepRadian = this.targetRadian;
	}
}

Instrument.prototype.getBuffer = function(length){
	var buffer = new Float32Array(length);
	if(this.stepRadian !== false) {
		for(var i = 0; i < length; i++) {
			this.offsetRadian += this.stepRadian;
			if( this.glide ){
				if( (this.stepRadian-this.targetRadian)*(this.stepRadian+this.glideRadian-this.targetRadian)<0 ) {
					this.stepRadian = this.targetRadian;
					this.glideRadian = 0;
				}
				else {
					this.stepRadian += this.glideRadian;
				}
				
			}
			buffer[i] = this.volume*this.oscillator(this.offsetRadian);
		}
	}
	else {
		this.removedAt += length;
	}
	return [buffer, buffer];
}

Instrument.prototype.offNote = 
Instrument.prototype.offAllNote = function(){
	if( this.stepRadian ){
		this.removedAt = 0;
	}
	this.lastRadian = this.stepRadian || this.lastRadian;
	this.targetRadian = false;
	this.stepRadian = false;
	this.glideRadian = false;
}

function square(rad){
	rad = rad%(2*Math.PI);
	if( rad<0 ) rad += (2*Math.PI);
	
	if( rad<Math.PI ){
		return 1;
	}
	else {
		return -1;
	}
}

function triangle(rad){
	rad = rad%(2*Math.PI);
	if( rad<0 ) rad += (2*Math.PI);
	
	var grad = 1/(Math.PI/2);
	if( rad<Math.PI/2 ){
		return rad*grad;
	}
	else if( rad<3*Math.PI/2 ){
		return 2-rad*grad;
	}
	else {
		return -4+rad*grad;
	}
}

function sawtooth(rad){
	rad = rad%(2*Math.PI);
	if( rad<0 ) rad += (2*Math.PI);
	
	var grad = 1/Math.PI;
	if( rad<Math.PI ){
		return rad*grad;
	}
	else {
		return -2+rad*grad;
	}
}