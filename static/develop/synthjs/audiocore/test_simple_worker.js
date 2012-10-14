addEventListener('message', onGetWave, false);

function onGetWave(e){
	
	postMessage( {} );
	
};



/** @constructor */
var Wave = function(arr, opt_tableSize){
	
	this._singingNotes = [];
	
	/**
	 * 鳴っていたNoteが消えた際の後処理を詰め込んだArray Buffer
	 */
	this._restBuffer = new Float32Array(0);
	
	this._num = Math.random();
};

/**
 * @private
 */
Wave.prototype.setSampleRate = function(sampleRate){
	this._sampleRate = sampleRate;
}

Wave.prototype.addEvent = function(event){
	switch( event.type ){
		case 'noteon':
			this._singingNotes.push({
				radianPerSample: event.note.freq / this._sampleRate * 2 * Math.PI,
				note: event.note.note,
				offsetRadian: 0
			});
			break;
		case 'noteoff':
			for(var i=0; i<this._singingNotes.length; i++){
				if( this._singingNotes[i].note == event.note.note ){
					this._singingNotes.splice(i, 1);
				}
			}
			break;
		case 'notealloff':
			this._singingNotes = [];
			break;
	}
};

Wave.prototype.getBuffer = function(len){
	
	var arr = new Float32Array(len);
	
	for( var i=0; i<this._singingNotes.length; i++ ){
		for( var j=0; j<len; j++ ){
			arr[j] += Math.sin( this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian 
				+ 0.5*Math.sin(3 * (this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian) 
					+ 0.5*Math.sin(7 * (this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian))
				));
		}	
		this._singingNotes[i].offsetRadian += this._singingNotes[i].radianPerSample * len;
	}
	
	var restLen = len<this._restBuffer.length ? len : this._restBuffer.length;
	for( i=0; i<restLen; i++ ){
		arr[i] += this._restBuffer[i];
	}   
	
	this._restBuffer = this._restBuffer.subarray(restLen);
	
	return arr;
}

var wave = new Wave([0,1,0,-1]);