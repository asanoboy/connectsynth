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
	this._eventList = [];
}

synthjs.encode.MidiTrack.prototype.addEvent = function(delta, event){
	this._eventList = {delta: delta, event: event};
}


/**
 * @constructor
 */
synthjs.encode.MidiEvent = function(){
	
}

synthjs.encode.MidiEvent.createMidiEvent = function(statusByte, dataByte, verocityByte){
	return new synthjs.encode.MidiEvent();
}

/**
 * @param {number} typeByte 1byte
 * @param {Uint8Array} data
 */
synthjs.encode.MidiEvent.createMetaEvent = function(typeByte, data){
	return new synthjs.encode.MidiEvent();
}

synthjs.encode.MidiEvent.createSysExEvent = function(){
	return new synthjs.encode.MidiEvent();
}

synthjs.encode.MidiEventType = {
	MIDI: 'midi',
	SYSEX: 'sysex',
	META: 'meta'
};

synthjs.encode.MidiMetaEventType = {
	END: 0x00,
	TEMPO: 0x00
};

synthjs.encode.MidiEventStatusType = {
	ON: 'on',
	OFF: 'off'
};

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
				var parser = new synthjs.encode.MidiParser(e.target.getResult());
				
				dWait.callback(
					parser.createMidi()
					//synthjs.encode.Midi._createFromArrayBuffer(e.target.getResult())
				);
			});
		
		reader.readAsArrayBuffer(file);		
	}
	
	
	return new synthjs.utility.Deferred()
		.addCallback(callback)
		.awaitDeferred(dWait);
}

/**
 * @constructor
 */
synthjs.encode.MidiParser = function(arrayBuffer){
	this._buffer = new Uint8Array(arrayBuffer);
	this._needle = 0;
	this._lastChannel = null;
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
	this._needle++;
	return true;
}

synthjs.encode.MidiParser.prototype.createMidi = function(){
	var midi = new synthjs.encode.Midi();
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
	midi.setFormat($.cur());
	$.next();
	
	var trackNum = $.cur() << 8;
	$.next();
	trackNum += $.cur();  
	midi.setTrackNum(trackNum);
	$.next();
	
	if( $.cur() & 0x80 ){ // negative
		var delta = - (($.cur() & ~0x80)<<8);
		$.next();
		delta += - $.cur();
		midi.setDelta( delta );  
	}
	else{ // positive
		var delta = (($.cur() & ~0x80)<<8);
		$.next();
		delta += $.cur();
		midi.setDelta( delta );
	}
	$.next();
	
	// read tracks
	var trackcnt = midi.getTrackNum(), t, len, track;
	
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

synthjs.encode.MidiParser.prototype.attachTrackEvent = function(track){
	var $ = this,
		delta = $.readVariableLength();

	
	if( $.cur()==0xf0 ){ // SysEx Event
		// pass
		if( !$.next() ) return;
		var len = $.readVariableLength();
		while(len--){
			if( !$.next() ) return;
		}
		
		//return synthjs.encode.MidiEvent.createSysExEvent();
		return true;
	}
	else if( $.cur()==0xf7 ){ // SysEx Event
		// pass
		if( !$.next() ) return;
		var len = $.readVariableLength();
		while(len--){
			if( !$.next() ) return;
		}
		
		//return synthjs.encode.MidiEvent.createSysExEvent();
		return true;
	}
	else if( $.cur()==0xff ) { // Meta Event
		// pass
		
		if( !$.next() ) return;
		
		var typeByte = $.cur();
		if( !$.next() ) return; // pass meta event type
		
		var len = $.readVariableLength(), i = 0;
		var data = new Uint8Array(len);
		while(i++<len){
			data[i-1] = $.cur(); 
			if( !$.next() ) return;
		}
		//return synthjs.encode.MidiEvent.createMetaEvent();
		track.addEvent(delta, synthjs.encode.MidiEvent.createMetaEvent(typeByte, data));
		return true;
	}
	else { // Midi Event
		if( $.cur() & 0x80 ){
			status = $.cur();
			if( !$.next() ) return;
		}
		else if( this._lastMidiStatus ){ // running status rule
			status = this._lastMidiStatus
		}
		else {
			return false;
		}
		
		var dataByte = $.cur();
		if( (dataByte & 0x80) && !$.next() ) return;
		
		var verocityByte = $.cur();
		if( (verocityByte & 0x80) && !$.next() ) return;
		
		this._lastMidiStatus = status;
		
		var event = synthjs.encode.MidiEvent.createMidiEvent(status, dataByte, verocityByte);
		if( event === false ){
			return false;
		}
		
		track.addEvent(delta, event);
		return true;
		
		//return synthjs.encode.MidiEvent.createMidiEvent(status, dataByte, verocityByte); 
	}
}


synthjs.encode.MidiParser.prototype.readVariableLength = function(){
	// TODO: fail to next();
	var len = 0, $ = this;
	while($.cur() & 0x80){
		len += len<<8 + ($.cur() & ~0x80);
		$.next();
	}
	len += $.cur();
	$.next();
	
	return len;
}
