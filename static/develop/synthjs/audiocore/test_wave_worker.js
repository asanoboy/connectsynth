addEventListener('message', onGetWave, false);

function onGetWave(e){
	var rt = {callback: e.data.callback};
	switch(e.data.action){
		case 'init':
			wave.setSampleRate(e.data.samplerate);
			break;
		case 'midi':
			wave.addEvent(e.data);
			break;
		case 'getbuffer':
			var buffer = wave.getBuffer(e.data.length);
			rt.leftbuffer = buffer;
			rt.rightbuffer = new Float32Array(buffer);
			break;
	}
	
	postMessage( rt );
}



/** @constructor */
var Wave = function(arr, opt_tableSize){
	
	this._singingNotes = [];

	this._removedNotes = [];	
	this._num = Math.random();
};

/**
 * @private
 */
Wave.prototype.setSampleRate = function(sampleRate){
	this._sampleRate = sampleRate;
};

Wave.prototype.addEvent = function(event){
	postMessage(this._singingNotes.length);
	if( event.type=='noteon' && event.velocity>0 ){
		this._singingNotes.push({
			radianPerSample: 440 * Math.pow(2, event.note/12-5) / this._sampleRate * 2 * Math.PI,
			note: event.note,
			offsetRadian: 0,
			velocity: event.velocity
		});
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

Wave.prototype.getBuffer = function(len){
	
	var arr = new Float32Array(len), theta, lastAmp, amp, isRemoved;
	
	for( var i=0; i<this._singingNotes.length; i++ ){
		isRemoved = false;
		for( var m=0; m<this._removedNotes.length; m++){
			//postMessage(this._removedNotes);
			if( this._singingNotes[i].note==this._removedNotes[m].note ){

				isRemoved = true;
				break;
			}
		}
		for( var j=0; j<len; j++ ){
			theta = this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian;
			amp = Math.sin(theta);
			if( isRemoved ){
				this._singingNotes[i].velocity -= 0.01;
				if(  this._singingNotes[i].velocity < 0 ){
					this._removedNotes[m].isRemoved = true;
					break;
				}
			}

			// arr[j] = 0.1 * Math.sin(this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian );
			arr[j] = 0.1 * this._singingNotes[i].velocity * Math.sin(this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian );
			// arr[j] += 0.1 * Math.sin( this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian
			// 	+ 0.5*Math.sin(3 * (this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian)
			// 		+ 0.5*Math.sin(7 * (this._singingNotes[i].radianPerSample * j + this._singingNotes[i].offsetRadian))
				// ));
		}
		this._singingNotes[i].offsetRadian += this._singingNotes[i].radianPerSample * len;

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
	
	
	return arr;
};

var wave = new Wave([0,1,0,-1]);