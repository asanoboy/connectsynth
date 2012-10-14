addEventListener('message', onGetWave, false);

function onGetWave(e) {
	var rt = {};

	switch(e.data.action) {
		case 'init':
			wave.setSampleRate(e.data.initParams.sampleRate);
			var controls = [];
			var width = 800,
				operatorNumber = 4,
				operatorWidth = 180,
				operatorHeight = 150,
				controlSize = 32,
				controlImage = "img/ic_up_circle.png";
				
			var operatorMargin = ( width-(operatorWidth * operatorNumber) )/5,
				innerMargin = ( operatorWidth-(controlSize * 4) )/5,
				height = operatorMargin*3 + operatorHeight + controlSize*4 + innerMargin*5, 
				algorithmPanelHeight = controlSize*4 + innerMargin*5,
				algorithmPanelWidth = controlSize*5 + innerMargin*6;
			
			// Set operator control.
			controls = controls.concat(
				(function(){
					var i, j, offsetX, offsetY, name, arr=[], adsr = ['a','d','s','r'];
					for(i=0; i<4; i++){
						offsetX = i*(operatorWidth+operatorMargin) + operatorMargin;
						offsetY = operatorMargin;
						
						// Octave and Factor
						for(j=0; j<2; j++){
							name = "ope"+i;
							name += j==0 ? "_oct" : "_fac"; 
							arr.push(
								{	
									type : "control",
									name : name,
									image : controlImage,
									value : 0,
									offsetX : offsetX + (j+1)*operatorWidth/3,
									offsetY : offsetY + operatorHeight/3,
									width : controlSize,
									height : controlSize
								}
							);
						}
						
						// ADSR
						for(j=0; j<4; j++){
							name = "ope"+i;
							name += "_"+adsr[j]; 
							arr.push(
								{	
									name : name,
									offsetX : offsetX + innerMargin/2 + controlSize/2 + j*(innerMargin+controlSize),
									offsetY : offsetY + 2*operatorHeight/3,
									type : "control", value : 0, image : controlImage,width : controlSize,height : controlSize
								}
							);
						}
						
					}
										
					return arr;
				})()
			);
			
			
			// Set algorithm panel.
			controls = controls.concat(
				(function(){
					var offsetX = width - algorithmPanelWidth - operatorMargin,
						offsetY = 2*operatorMargin + operatorHeight,
						arr = [],
						i, j, name, suffixList=["mod0","mod1","mod2","mod3",'out'];
					
					for(i=0; i<4; i++){
						for(j=0; j<5; j++){
							name = "car"+i+"_"+suffixList[j];
							arr.push({
								name : name,
								offsetX : offsetX + innerMargin/2 + controlSize/2 + j*(innerMargin+controlSize),
								offsetY : offsetY + (innerMargin+controlSize)/2 + i*(innerMargin+controlSize),
								type : "control", value : 0, image : controlImage,width : controlSize,height : controlSize
							});
						}
					}
					
					
					return arr;
				})()
			);
			
			// Set volume control.
			controls = controls.concat(
				(function(){
					return [{
						name : "vol",
						offsetX : operatorMargin + (operatorWidth)/2,
						offsetY : (height + operatorMargin + operatorHeight)/2,
						type : "control", value : 0, image : controlImage,width : controlSize,height : controlSize
					}];
				})()
			);
			
			// Set envelope control.
			controls = controls.concat(
				(function(){
					var arr = [], 
						adsr=['a','d','s','r'], 
						centerX = ( (operatorMargin+operatorWidth/2) 
							+ (width-operatorMargin-algorithmPanelWidth) )/2,
						offsetX = centerX - 2/3*(controlSize+innerMargin);
					for(var i=0; i<4; i++){
						arr.push({
							name : adsr[i],
							offsetX : offsetX + i*(controlSize+innerMargin),
							offsetY : (height + operatorMargin + operatorHeight)/2,
							type : "control", value : 0, image : controlImage,width : controlSize,height : controlSize							
						});
					}
					
					return arr;
				})()
			);
			
			rt.controller = {
				background : {
					image : "img/background.png",
					height : height,
					width : width
				},
				controls : controls
			};
			
			break;
		case 'setParam':
			
			var name = e.data.name;
			var value = e.data.value;
			var mat, opeIndex, suffix;
			
			if( (mat=name.match(/^ope([\d]+)_([a-z]+)$/)) ){
				var opeIndex = mat[1];
				var suffix = mat[2];
				switch(suffix){
					case 'a':
					case 'd':
					case 's':
					case 'r':
						wave.setOperatorEnvelope(opeIndex, suffix, value);
						break;
					case 'oct':
						wave.setOperatorOctave(opeIndex, value);
						break;
					case 'fac':
						wave.setOperatorFactor(opeIndex, value);
				}
			}
			else if( (mat=name.match(/^car([\d]+)_(mod([\d]+)|out)$/)) ){
				switch(mat[2]){
					case 'out':
						wave.setOutput(mat[1], value);
						break;
					case 'mod0':
					case 'mod1':
					case 'mod2':
					case 'mod3':
						wave.setParameter(mat[1], mat[3], value);
						break;
				}
			}
			else if( name=='vol' ){
				wave.setVolume(value)
			}
			
			break;
		case 'addEvent':
			wave.addEvent(e.data.event);
			break;
		case 'getBuffer':
			var buffer = wave.getBuffer(e.data.length);
			rt.leftBuffer = buffer;
			rt.rightBuffer = new Float32Array(buffer);
			// rt.leftBuffer = new Float32Array(e.data.length);
			// rt.rightBuffer = new Float32Array(e.data.length);
			break;
		default:
			return;
	}

	rt.callback = e.data.callback;

	postMessage(rt);
};


///////////////////////////////////////////////////////////

/** @constructor */
var Operator = function(){
	
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
Operator.prototype.getValue = function(id, radian, second, modList, modFactorList, isRemoved, secondFromRemoved){
	var value, modValue = this._octave*radian;
	for( var i=0; i<modList.length; i++){
		modValue += modList[i].getLastValue(id) * modFactorList[i]; 
	}
	
	var value = Math.sin(modValue) * this._factor;
	
	// Envelope
	if( isRemoved ){
		if( secondFromRemoved < this._release ){
			value *= this._sustain - secondFromRemoved * this._sustain / this._release;
		}
		else { // TODO: dispatch Finish Event.
			//wave.deleteNote(id);
			this._noteidToFinished[id] = true;
			value = 0;
		}
	}
	else{
		if( second < this._attack ){
			value *= second * this._attackInverse;
		}
		else if( second < this._attack+this._decay ){
			value *= 1 - (second-this._attack) * this._decayInverse * (1 - this._sustain);
		}
		else {
			value *= this._sustain;
		}
	}
	
	this._noteidToLastValues[id] = value;
	return this._noteidToLastValues[id];
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

///////////////////////////////////////////////////////////

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
		this._operatorList.push(new Operator());
	}
	
	/**
	 * This improves performance of calculation.
	 */
	//this._validOperatorIndex = [];
	
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
		this._codeToCalcFunction[code] = function(id, radian, second, isRemoved, secondFromRemoved){
			
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
				
				sum += ope.getValue(id, radian, second, modList, factorList, isRemoved, secondFromRemoved) * this._outputList[i];
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

// TOOD: Change function name. 
OperatorController.prototype.setParameter = function(carrierIndex, modulatorIndex, value){
	this._modulatorToCarrierFactors[modulatorIndex][carrierIndex] = value;
	this._setCalcFunction();
}

OperatorController.prototype.setOutput = function(operatorIndex, value){
	this._outputList[operatorIndex] = value;
	this._setCalcFunction();
}

OperatorController.prototype.setVolume = function(value){
	this._volume = value;
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
	
	// for (var i = 0; i < this._singingNotes.length; i++) {
		// if (this._singingNotes[i].id == id) {
			// this._singingNotes.splice(i, 1);
		// }
	// }
}

// OperatorController.prototype.reserveDeleteNote = function(id){
	// this._reservedDeleteNoteIds.push(id);
	// for (var i = 0; i < this._singingNotes.length; i++) {
		// if (this._singingNotes[i].id == id) {
			// this._singingNotes.splice(i, 1);
		// }
	// }
// }
// 
// OperatorController.prototype.deleteReservedNote = function(){
	// for( var j = 0; j < this._reservedDeleteNoteIds.length; j++ ){
		// var id = this._reservedDeleteNoteIds[j]
		// this.deleteNote(id);
	// }
	// this._reservedDeleteNoteIds = [];
// }

OperatorController.prototype.addEvent = function(event){
	switch (event.type) {
		case 'noteon':
			
			this._singingNotes[this._currentNoteId++] = {
				radianPerSample: event.note.freq / this._sampleRate * 2 * Math.PI,
				note: event.note.note,
				offsetRadian: 0,
				offsetSecond: 0,
				offsetSecondFromRemoved: 0,
				isRemoved: false
			};
			break;
		case 'noteoff':
			for( var id in this._singingNotes ){
				if( this._singingNotes[id].note == event.note.note ){
					this._singingNotes[id].isRemoved = true;
				}
			}
			break;
		
			// for (var i = 0; i < this._singingNotes.length; i++) {
				// if (this._singingNotes[i].note == event.note.note) {
					// //this._singingNotes.splice(i, 1);
					// this._singingNotes[i].isRemoved = true;
				// }
			// }
			break;
		case 'notealloff':
			this._singingNotes = {};
			break;
	}
} 

OperatorController.prototype.getBuffer = function(len) {

	var arr = new Float32Array(len), offsetRadian, radianPerSample, output, nodeId;

	//for(var i = 0; i < this._singingNotes.length; i++) {
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
				this._singingNotes[id].offsetSecondFromRemoved + this._secondPerSample * j);
		}
		
		this._singingNotes[id].offsetRadian += radianPerSample * len;
		this._singingNotes[id].offsetSecond += this._secondPerSample * len;
		if( this._singingNotes[id].isRemoved ){
			this._singingNotes[id].offsetSecondFromRemoved += this._secondPerSample * len;
		}
		
	}
	
	this.flushFinishNote();
	
	//this.deleteReservedNote();
	
	var restLen = len < this._restBuffer.length ? len : this._restBuffer.length;
	for( i = 0; i < restLen; i++) {
		arr[i] += this._restBuffer[i];
	}

	this._restBuffer = this._restBuffer.subarray(restLen);

	return arr;
}

var wave = new OperatorController();
