/** @constructor */
var Operator = function(sampleRate){
	
	this._sampleRate = sampleRate;
	
	/**  
	 * @type {integer} larger than 0
	 * @private
	 */
	this._octave = 0;
	
	/** 
	 * @type {float} larger than 0
	 * @private
	 */
	this._factor = 0;
	
	/** Unit is second. */
	this._attack = 0;
	this._attackInverse = null;
	
	/** Unit is second. */
	this._decay = 0;
	this._decayInverse = null;
	
	/** Unit is none, range is [0,1]. */
	this._sustain = 0;
	
	/** Unit is second. */
	this._release = 0;
	
	/**
	 * This is used for feedback algorithm.
	 */
	this._noteidToLastValues = {};
	
	this._noteidToLastFactor = {};
	
	this._noteidToFinished = {};
}

Operator.prototype.setEnvelope = function(type, value){
	switch(type){
		case 'a': 
			this._attack = value;
			this._attackInverse = 1/value; 
			break;
		case 'd': 
			this._decay = value; 
			this._decayInverse = 1/value;
			break;
		
		case 's': this._sustain = value; break;
		case 'r': this._release = value; break;
	}
	
	if( this._release==0 ){
		this._releasePerSample = 1;
	}
	else if( this._sustain==0 ){
		this._releasePerSample = 1;
	}
	else {
		this._releasePerSample = this._sustain / this._release / this._sampleRate;
	}
	
}

Operator.prototype.setOctave = function(octave){
	this._octave = octave;
}

Operator.prototype.setFactor = function(factor){
	this._factor = factor;
}

/**
 * @param {float} second This is second from started.
 * @param {boolean} isRemoved
 */
Operator.prototype.getValue = function(id, radian, second, modList, modFactorList, isRemoved, secondFromRemoved, secondRemovedAt){
	var value, modValue = this._octave*radian;
	for( var i=0; i<modList.length; i++){
		modValue += modList[i].getLastValue(id) * modFactorList[i]; 
	}
	
	var value = Math.sin(modValue) * this._factor;
	
	// Envelope
	if( isRemoved ){
		//var factor = this.getVolumeBeforeRemoved(secondRemovedAt) - secondFromRemoved * this._sustain / this._release;
		var factor = this._noteidToLastFactor[id] - this._releasePerSample; 
		//if( secondFromRemoved < this._release ){
		if( factor > 0 ){
			//value *= factor;
		}
		else { // TODO: dispatch Finish Event.
			//wave.deleteNote(id);
			this._noteidToFinished[id] = true;
			factor = 0;
		}
	}
	else{
		var factor = this.getVolumeBeforeRemoved(second); 
		// if( second < this._attack ){
			// value *= second * this._attackInverse;
		// }
		// else if( second < this._attack+this._decay ){
			// value *= 1 - (second-this._attack) * this._decayInverse * (1 - this._sustain);
		// }
		// else {
			// value *= this._sustain;
		// }
	}
	value *= factor;
	
	this._noteidToLastValues[id] = value;
	this._noteidToLastFactor[id] = factor; 
	return this._noteidToLastValues[id];
}

/**
 * @return {number} range[0,1]
 */
Operator.prototype.getVolumeBeforeRemoved = function(second){
	if( second < this._attack ){
		return second * this._attackInverse;
	}
	else if( second < this._attack+this._decay ){
		return 1 - (second-this._attack) * this._decayInverse * (1 - this._sustain);
	}
	else {
		return this._sustain;
	}
}

Operator.prototype.isFinished = function(id){
	return this._noteidToFinished[id] ? true : false;
}

Operator.prototype.flushFinished = function(id){
	this._noteidToFinished[id] = {};
}

Operator.prototype.getLastValue = function(id){
	return this._noteidToLastValues[id] || 0;
}

Operator.prototype.removeNoteById = function(id){
	delete this._noteidToLastValues[id];
};