/** @constructor */
var OperatorController = function(){
	this._operatorNum = 4;
	
	this._volume = 0;
	this._attack = 0;
	this._decay = 0;
	this._sustain = 0;
	this._release = 0;
	
	this._sampleRate = 48000;
	this._secondPerSample = 1/this._sampleRate;
	
	this._singingNotes = {};
	
	/**
	 * This is incremented by each 'noteon' event. 
	 */
	this._currentNoteId = 0;
	
	/**
	 * This includes functions for each algorithm to cache.
	 * Keys are algorithm code to be created this._createAlgorithmCode().
	 */
	this._codeToCalcFunction = {};
	this._codeToFlagList = {};
	
	/**
	 * This is the current one in this._codeToCalc values.
	 */
	this._currentCalcFunction = null;
	this._currentFlagList = null;
	
	/**
	 * TODO: 
	 */
	this._restBuffer = new Float32Array(0);
	
	this._operatorList = [];
	for(var i=0; i<this._operatorNum; i++){
		this._operatorList.push(new Operator(this._sampleRate));
	}
	
	
	/**
	 * This is 2-dim matrix, and includes factors from modulator to carrier.
	 */
	this._modulatorToCarrierFactors = [];
	
	/**
	 * This includes output settings.
	 */
	this._outputList = [];
	
	var arr;
	for(var i=0; i<this._operatorNum; i++){
		arr = [];
		for (var j = 0; j < this._operatorNum; j++) {
			arr.push(0);
		}
		this._modulatorToCarrierFactors.push(arr);
		this._outputList.push(0);
	}
	
	this._reservedDeleteNoteIds = [];
	
	this._setCalcFunction();
}

OperatorController.prototype.setOperatorEnvelope = function(operatorIndex, type, value){
	this._operatorList[operatorIndex].setEnvelope(type, value);
}

OperatorController.prototype.setOperatorOctave = function(operatorIndex, octave){
	this._operatorList[operatorIndex].setOctave(octave);
}

OperatorController.prototype.setOperatorFactor = function(operatorIndex, factor){
	this._operatorList[operatorIndex].setFactor(factor);
}

OperatorController.prototype._setCalcFunction = function(){
	var code = this._createAlgorithmCode();
	
	if( !this._codeToCalcFunction[code] ){
		var self = this;
	
		var flagList = new Array(this._operatorNum);
		for( var i=0; i<this._operatorNum; i++ ){
			for( var j=0; j<this._operatorNum; j++ ){
				flagList[i] |= this._modulatorToCarrierFactors[i][j]!=0;
				flagList[j] |= this._modulatorToCarrierFactors[i][j]!=0; 
			}
			flagList[i] |= this._outputList[i]!=0;
		}
		
		this._codeToFlagList[code] = flagList;
		this._codeToCalcFunction[code] = function(id, radian, second, isRemoved, secondFromRemoved, secondRemovedAt){
			
			var value, ope, modList, factorList, sum=0;
			
			for(var i=flagList.length; i>=0; i--){
				if( !flagList[i] ) continue;
				ope = self._operatorList[i];
				modList = [];
				factorList = [];
				
				for( var j=0; j<flagList.length; j++){
					if( !flagList[j] ) continue;
					modList.push( self._operatorList[j] );
					factorList.push( self._modulatorToCarrierFactors[j][i] );
				}
				
				sum += ope.getValue(id, radian, second, modList, factorList, isRemoved, secondFromRemoved, secondRemovedAt) * this._outputList[i];
			}
			
			return sum * this._volume;
		};
	}
	
	this._currentCalcFunction =  this._codeToCalcFunction[code];
	this._currentFlagList = this._codeToFlagList[code];
}


OperatorController.prototype._createAlgorithmCode = function(){
	var code = '';
	for( var i=0; i<this._operatorNum; i++){
		for( var j=0; j<this._operatorNum; j++){
			code += this._modulatorToCarrierFactors[i][j]!=0 ? 'o' : '_';
		}
		code += this._outputList[i]!=0 ? 'o' : '_';
		code += "-";
	}
	
	return code;
	
}

OperatorController.prototype.setVolume = function(volume){
	this._volume = volume;
}

// TOOD: Change function name. 
OperatorController.prototype.setParameter = function(carrierIndex, modulatorIndex, value){
	this._modulatorToCarrierFactors[modulatorIndex][carrierIndex] = value;
	this._setCalcFunction();
}

OperatorController.prototype.setOutput = function(operatorIndex, value){
	this._outputList[operatorIndex] = value;
	this._setCalcFunction();
}

OperatorController.prototype.setSampleRate = function(rate){
	this._sampleRate = rate;
	this._secondPerSample = 1/rate;
}

/**
 * Flush finish note buffer, and delete finished notes in this._singingNotes.
 */
OperatorController.prototype.flushFinishNote = function(){
	var finished, i;
	for( var id in this._singingNotes ){
		finished = true;
		for( i=0; i<this._operatorNum; i++){
			if( !this._currentFlagList[i] ){
				continue;
			}
			
			finished &= this._operatorList[i].isFinished(id);
		}
		if( finished ){
			delete this._singingNotes[id];
		}
	}
	
	for( i=0; i<this._operatorNum; i++){
		this._operatorList[i].flushFinished();
	}

	
}

OperatorController.prototype.deleteNote = function(id){
	delete this._singingNotes[id];
}

OperatorController.prototype.addEvent = function(type, note, velocity){
	switch (type) {
		case 'noteon':
			
			this._singingNotes[this._currentNoteId++] = {
				radianPerSample: 440 * Math.pow(2, (note/12-5) ) / this._sampleRate * 2 * Math.PI,
				note: note,
				offsetRadian: 0,
				offsetSecond: 0,
				offsetSecondFromRemoved: 0,
				isRemoved: false
			};
			break;
		case 'noteoff':
			for( var id in this._singingNotes ){
				if( this._singingNotes[id].note == note ){
					this._singingNotes[id].isRemoved = true;
					this._singingNotes[id].secondRemovedAt = this._singingNotes[id].offsetSecond;
				}
			}
			break;
			break;
		case 'notealloff':
			this._singingNotes = {};
			break;
	}
} 

OperatorController.prototype.getBuffer = function(len) {

	var arr = new Float32Array(len), offsetRadian, radianPerSample, output, nodeId;

	for(var id in this._singingNotes) {
		offsetRadian = this._singingNotes[id].offsetRadian;
		offsetSecond = this._singingNotes[id].offsetSecond; 
		radianPerSample = this._singingNotes[id].radianPerSample;
		
		for(var j = 0; j < len; j++) {
			arr[j] += this._currentCalcFunction(
				id, 
				offsetRadian + radianPerSample * j,
				offsetSecond + this._secondPerSample * j,
				this._singingNotes[id].isRemoved,
				this._singingNotes[id].offsetSecondFromRemoved + this._secondPerSample * j,
				this._singingNotes[id].secondRemovedAt);
		}
		
		this._singingNotes[id].offsetRadian += radianPerSample * len;
		this._singingNotes[id].offsetSecond += this._secondPerSample * len;
		if( this._singingNotes[id].isRemoved ){
			this._singingNotes[id].offsetSecondFromRemoved += this._secondPerSample * len;
		}
		
	}
	
	this.flushFinishNote();
	
	var restLen = len < this._restBuffer.length ? len : this._restBuffer.length;
	for( i = 0; i < restLen; i++) {
		arr[i] += this._restBuffer[i];
	}

	this._restBuffer = this._restBuffer.subarray(restLen);

	return arr;
}
