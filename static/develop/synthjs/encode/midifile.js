goog.provide("synthjs.encode.MidiFile");
goog.provide("synthjs.encode.MidiParser");

goog.require("goog.asserts");

/*
 * This is an interface of binary file in midi format.
 */


/**
 * Wraps binary midi data in Uint8Array. 
 * @constructor
 * @private
 */
synthjs.encode.MidiFile = function(){
	
	/**
	 * @type {Uint8Array}
	 */
	this._header = new Uint8Array(0);
	
	/**
	 * @type {Array} 
	 */
	this._tracks = [];
}

/**
 * @param {Uint8Array} header
 */
synthjs.encode.MidiFile.prototype.setHeader = function(header){
	this._header = header;
}

/**
 * @return {Uint8Array}
 */
synthjs.encode.MidiFile.prototype.getHeader = function(){
	return this._header;
}

synthjs.encode.MidiFile.prototype.getHeaderDelta = function(){
	return this._header[12] << 8 + this._header[13]; 
}



/**
 * @return {number]
 */
synthjs.encode.MidiFile.prototype.getTrackNum = function(){
	return this._tracks.length;
}

/**
 * @param {synthjs.encode.MidiTrack} track
 */
synthjs.encode.MidiFile.prototype.addTrack = function(track){
	this._tracks.push(track);
}

/**
 * @return {synthjs.encode.MidiTrack}
 */
synthjs.encode.MidiFile.prototype.getTrack = function(index){
	if( index >= this._tracks.length ) return false;
	
	return this._tracks[index];
}


/**
 * Wraps midi track data in Uint8Array. 
 * @constructor
 */
synthjs.encode.MidiTrack = function(){
	this._eventList = [];
	this._header = new Uint8Array(0);
}

/**
 * @param {Uint8Array} header
 */
synthjs.encode.MidiTrack.prototype.setHeader = function(header){
	this._header = header;
}

/**
 * @return {Uint8Array}
 */
synthjs.encode.MidiTrack.prototype.getHeader = function(){
	return this._header;
}

/**
 * @param {Uint8Array} header
 */
synthjs.encode.MidiTrack.prototype.addEvent = function(buffer){
	this._eventList.push(buffer);
}

/**
 * @return {number}
 */
synthjs.encode.MidiTrack.prototype.getEventNum = function(){
	return this._eventList.length;
}

/**
 * @param {number} index
 * @return {Uint8Array|boolean}
 */
synthjs.encode.MidiTrack.prototype.getEvent = function(index){
	if( index >= this._eventList.length ) return false;
	
	return this._eventList[index];
}

synthjs.encode.MidiTrack.prototype.getEventDelta = function(index){
	if( index >= this._eventList.length ) return false;
	
	var buffer = this._eventList[index];
	var delta = 0, finished = false;
	for( var i=0; i<buffer.length; i++){
		delta = delta << 8;
		if( buffer[i] & 0x80 ){
			delta += (buffer[i] & ~0x80);
			continue;
		}
		delta += buffer[i];
		finished = true;
		break;
	}
	
	goog.asserts.assert(finished);
	
	return delta;
}


synthjs.encode.MidiTrack.prototype.getEventType = function(index){
	if( index >= this._eventList.length ) return false;
	
	//TODO:
	switch( this._eventList[index][0] ){
		case 0xf0:
		case 0xf7:
			return 'sysex';
		case 0xff:
			return 'meta';
		default:
	}
}




/**
 * Parses ArrayBuffer as binary midi file and creates an instance of synthjs.encode.MidiFile. 
 * @constructor
 * @param {ArrayBuffer} arrayBuffer
 */
synthjs.encode.MidiParser = function(arrayBuffer){
	this._buffer = new Uint8Array(arrayBuffer);
	this._needle = 0;
	this._lastChannel = null;
	this._bufferArray = [];
}

/**
 * @return {number}
 */
synthjs.encode.MidiParser.prototype.cur = function(){
	return this._buffer[this._needle];
}

/**
 * @return {boolean}
 */
synthjs.encode.MidiParser.prototype.next = function(){
	if( this._needle >= this._buffer.length ){
		return false;
	}
	this._bufferArray.push(this.cur());
	this._needle++;
	return true;
}

/**
 * @return {boolean}
 */
synthjs.encode.MidiParser.prototype.flushBuffer = function(){
	this._bufferArray = [];
	return true;
}

/**
 * @return {Uint8Array}
 */
synthjs.encode.MidiParser.prototype.getBuffer = function(){
	return new Uint8Array(this._bufferArray);
}

/**
 * @return {synthjs.encode.MidiFile|boolean}
 */
synthjs.encode.MidiParser.prototype.createMidi = function(){
	var midi = new synthjs.encode.MidiFile();
	var $ = this;
	
	// read header
	if( ($.cur()==0x4d && $.next()) && // 'M'
		($.cur()==0x54 && $.next()) && // 'T'
		($.cur()==0x68 && $.next()) && // 'h'
		($.cur()==0x64 && $.next()) && // 'd'
		
		($.cur()==0x00 && $.next()) &&
		($.cur()==0x00 && $.next()) &&
		($.cur()==0x00 && $.next()) &&
		($.cur()==0x06 && $.next()) &&
		
		($.cur()==0x00 && $.next())
	)
	{
		
	}
	else {
		return false;
	}
	
	if( ! ($.cur() in [0x00, 0x01, 0x02]) )
	{
		return false;
	}
	$.next();
	
	var trackNum = $.cur() << 8;
	$.next();
	trackNum += $.cur();  
	$.next();
	
	if( $.cur() & 0x80 ){ // negative
		$.next();
	}
	else{ // positive
		$.next();
	}
	$.next();
	
	midi.setHeader($.getBuffer());
	$.flushBuffer();
	
	// read tracks
	var trackcnt = trackNum, t, len, track;
	
	while(trackcnt--){
		if( !( track=$.createMidiTrack() ) ){
			return false;
		}
		
		midi.addTrack(track);
	}
	
	if( !$.next() ){ // Confirm EOF.
		return midi;
	}
	else{
		return false;
	}
	
		
}

synthjs.encode.MidiParser.prototype.createMidiTrack = function(){
	this._lastMidiStatus = null;
	var track = new synthjs.encode.MidiTrack();
	
	
	var $ = this;
	if( ($.cur()==0x4d && $.next()) && // 'M'
		($.cur()==0x54 && $.next()) && // 'T'
		($.cur()==0x72 && $.next()) && // 'r'
		($.cur()==0x6b && $.next())  // 'k'
	)
	{
		
	}
	else {
		return false;
	}
	
	
	len = $.cur();
	$.next();
	len = (len<<8) + $.cur();
	$.next();
	len = (len<<8) + $.cur();
	$.next();
	len = (len<<8) + $.cur();
	$.next();
	
	track.setHeader($.getBuffer());
	$.flushBuffer();
	
	var end = this._needle + len, event;
	while(this._needle < end) {
		if( !$.attachTrackEvent(track) ){
			return false;
		}
	}
	
	if( this._needle != end ){
		return false;
	}
	
	return track;
}

/**
 * 
 * @param {synthjs.encode.MidiTrack} track
 * @return {boolean}
 */
synthjs.encode.MidiParser.prototype.attachTrackEvent = function(track){
	var $ = this,
		delta = $.readVariableLength();
	
	if( delta===false ) return false;

	if( $.cur()==0xf0 ){ // SysEx Event
		// pass
		if( !$.next() ) return false;
		var len = $.readVariableLength();
		if( len===false ) return false;
		while(len--){
			if( len==0 && $.cur()!=0xf7 ) return false;
			if( !$.next() ) return false;
			
		}
		
		track.addEvent($.getBuffer());
		$.flushBuffer();
		return true;
	}
	else if( $.cur()==0xf7 ){ // SysEx Event
		// pass
		if( !$.next() ) return false;
		var len = $.readVariableLength();
		if( len===false ) return false;
		while(len--){
			if( !$.next() ) return false;
		}
		
		track.addEvent($.getBuffer());
		$.flushBuffer();
		return true;
	}
	else if( $.cur()==0xff ) { // Meta Event
		
		if( !$.next() ) return false;
		
		if( !$.next() ) return false; // pass meta event type
		
		var len = $.readVariableLength();
		if( len===false ) return false;
		
		while(len--){
			if( !$.next() ) return false;
		}
		
		track.addEvent($.getBuffer());
		$.flushBuffer();
		return true;
	}
	else { // Midi Event
		if( $.cur() & 0x80 ){
			status = $.cur();
			if( !$.next() ) return false;
		}
		else if( this._lastMidiStatus ){ // running status rule
			status = this._lastMidiStatus
		}
		else {
			return false;
		}
		
		// check databyte
		if( ($.cur() & 0x80) && !$.next() ) return false;
		
		// check databyte
		if( ($.cur() & 0x80) && !$.next() ) return false;
		
		this._lastMidiStatus = status;
		
		
		track.addEvent($.getBuffer());
		$.flushBuffer();
		return true;
	}
}


synthjs.encode.MidiParser.prototype.readVariableLength = function(){
	
	var len = 0, $ = this;
	while($.cur() & 0x80){
		len += len<<8 + ($.cur() & ~0x80);
		if( !$.next() ) return false;
	}
	len += $.cur();
	if( !$.next() ) return false;
	
	return len;
}

/**
 * Converts an instance of synthjs.encode.MidiFile to that of ArrayBuffer.
 * @constructor
 * @param {synthjs.encode.MidiFile} midi
 */
synthjs.encode.MidiBuilder = function(midi){
	this._midi = midi;
}

/**
 * @return {ArrayBuffer}
 */
synthjs.encode.MidiBuilder.prototype.build = function(){
	var arr = [];
	
	arr = arr.concat(new Array(this._midi.getHeader()));
	
	var trackBuffers = [];
	
	for( var i=0; i<this._midi.getTrackNum(); i++ ){
		var track = this._midi.getTrack(i);
		arr = arr.concat(new Array(track.getHeader()));
		
		for( var j=0; j<track.getEventNum(); j++){
			arr = arr.concat(new Array(track.getEvent(j)));
		}
	}
	
	return new ArrayBuffer(arr);
}