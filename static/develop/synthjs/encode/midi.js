goog.provide("synthjs.encode.Midi");

goog.require("goog.fs.FileReader");
goog.require("goog.events.EventHandler");
goog.require("synthjs.utility.Deferred");

/**
 * @constructor
 * @private
 */
synthjs.encode.Midi = function(){
	/**
	 * @type {number}
	 */
	this._format = 0;
	
	/**
	 * @type {number}
	 */
	this._delta = 0;
	
	/**
	 * @type {Array} 
	 */
	this._tracks = [];
}

/**
 * @param {number} format
 */
synthjs.encode.Midi.prototype.setFormat = function(format){
	this._format = format;
}

/**
 * @return {number]
 */
synthjs.encode.Midi.prototype.getFormat = function(){
	return this._format;
}

/**
 * @param {number} num
 */
synthjs.encode.Midi.prototype.setTrackNum = function(num){
	this._trackNum = num;
}

/**
 * @return {number]
 */
synthjs.encode.Midi.prototype.getTrackNum = function(){
	return this._trackNum;
}

/**
 * @param {number} delta
 */
synthjs.encode.Midi.prototype.setDelta = function(delta){
	this._delta = delta;
}

/**
 * @return {number]
 */
synthjs.encode.Midi.prototype.getDelta = function(){
	return this._delta;
}

/**
 * @param {synthjs.encode.MidiTrack} track
 */
synthjs.encode.Midi.prototype.addTrack = function(track){
	this._tracks.push(track);
}


/**
 * @constructor
 */
synthjs.encode.MidiTrack = function(){
	
}

/**
 * @param {Uint8Array} buffer
 */
synthjs.encode.MidiTrack.create = function(buffer){
	var i = 0;
	
}




/**
 * 
 * @return  {synthjs.utility.Deferred|Boolean}
 */
synthjs.encode.Midi.loadDeferred = function(){
	
	var reader = new goog.fs.FileReader();
	var handler = new goog.events.EventHandler();
	var dWait = new synthjs.utility.Deferred();
	
	/**
	 * @param {File|Blob|ArrayBuffer} file
	 */
	var callback = function(file){

		handler.listen(reader,
			goog.fs.FileReader.EventType.LOAD,
			function(e){
				handler.dispose();
				handler = null;
				dWait.callback(
					synthjs.encode.Midi._createFromArrayBuffer(e.target.getResult())
				);
			});
		
		reader.readAsArrayBuffer(file);		
	}
	
	
	return new synthjs.utility.Deferred()
		.addCallback(callback)
		.awaitDeferred(dWait);
}

/**
 * @private
 * @param {ArrayBuffer} buffer
 * @return {synthjs.encode.Midi|Boolean}
 */
synthjs.encode.Midi._createFromArrayBuffer = function(buffer){
	var data = new Uint8Array(buffer);
	var midi = new synthjs.encode.Midi();
	
	var h = data.subarray(0, 14), tmp;
	var i=0;
	
	// read header
	if( h[i++]!=0x4d || // 'M'
		h[i++]!=0x54 || // 'T'
		h[i++]!=0x68 || // 'h'
		h[i++]!=0x64 || // 'd'
		
		h[i++]!=0x00 ||
		h[i++]!=0x00 ||
		h[i++]!=0x00 ||
		h[i++]!=0x06 ||
		
		h[i++]!=0x00
	)
	{
		return false;
	}
	
	if( ! ((tmp=h[i++]) in [0x00, 0x01, 0x02]) )
	{
		return false;
	}
	midi.setFormat(parseInt(tmp));
	
	midi.setTrackNum(h[i++]*16 + h[i++]);
	
	tmp = h[i++];
	if( tmp & 0x80 ){ // negative
		midi.setDelta( - (tmp & ~0x80) * 16 + h[i++] );  
	}
	else{ // positive
		midi.setDelta( tmp * 16 + h[i++] );
	}
	
	// read tracks
	var trackcnt = midi.getTrackNum(), t, len, track;
	var tracksData = data.subarray(14);
	
	while(trackcnt--){
		i=0;
		if( tracksData[i++]!=0x4d || // 'M'
			tracksData[i++]!=0x54 || // 'T'
			tracksData[i++]!=0x72 || // 'r'
			tracksData[i++]!=0x68  // 'k'
		)
		{
			return false;
		}
		len = tracksData[i++];
		len = len<<16 + tracksData[i++];
		len = len<<16 + tracksData[i++];
		len = len<<16 + tracksData[i++];
		
		t = tracksData.subarray(8, 8+len);
		
		if( !(track=synthjs.encode.MidiTrack.create(t)) ){
			return false;
		}
		midi.addTrack(track);
		
		tracksData = tracksData.subarray(8+len);
	}
	
	
	if( !synthjs.encode.Midi.checkFormat(buffer) ){
		return false;
	}
	
	return midi;
}