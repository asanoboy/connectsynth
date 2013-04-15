goog.provide("synthjs.audiocore.Player");

goog.require("synthjs.audiocore.Generator");
goog.require('goog.object');
goog.require("goog.events.EventTarget");

/** @constructor */
synthjs.audiocore.Player = function(){
	goog.base(this);

	/** @private */
	this._sampleRate = null;//SAMPLE_RATE;

    /** @const */
    this.STREAM_LENGTH = 2048;
	/** @private */
	this._hasWebAudioApi = ( typeof webkitAudioContext == 'function' ) ||
		( typeof webkitAudioContext == 'object' ) ;

	/** @private */
	this._hasAudioDataApi = false;
	if( typeof Audio == 'function' ){
		var a = new Audio();
		this._hasAudioDataApi = typeof a['mozSetup'] == 'function';
	}

	/** @private */
	this._generatorList = [];

	/** @private */
	this._generatorCurrentIndex = 0;

	/** @private */
	this._status = 'stop';

	this._stopTimer = null;

	this._isLatencyTimer = false;
	this._latencyFrom = null;
};
goog.inherits(synthjs.audiocore.Player, goog.events.EventTarget);

goog.addSingletonGetter(synthjs.audiocore.Player);

/**
 * If flag is true, the player dispatches PUT_LATENCY event.
 * @param {Boolean} flag [description]
 */
synthjs.audiocore.Player.prototype.setLatencyTimer = function(flag){
	this._isLatencyTimer = flag;
};
/**
 * @public
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype.addGenerator = function(gen){
	gen.setSampleRate(this._sampleRate);
	var index = this._generatorCurrentIndex++;
	this._generatorList.push(gen);
	return index;
};

synthjs.audiocore.Player.prototype.removeGenerator = function(generator){
	this._generatorList = goog.array.filter(this._generatorList, function(gen){
		return gen!=generator;
	}, this);
};

synthjs.audiocore.Player.prototype.getSampleRate = function(){
	return this._sampleRate ||
		( this._hasWebAudioApi && (this._sampleRate=this._getWebAudioApiContext()['sampleRate']) ) ||
        ( this._hasAudioDataApi && (goog.asserts.fail("Not available for AudioDataApi")) );
};

/**
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype.play = function(){

	if( this._stopTimer ){
		clearTimeout(this._stopTimer);
		this._stopTimer = null;
	}
	if( this._status == 'play' ){
		//this._WebAudioApiNode['disconnect']();
		this.stop();
	}
	if( this._hasAudioDataApi ){
		this._status = 'play';
		return this._playByAudioDataApi();
	}
	else if( this._hasWebAudioApi ){
		this._status = 'play';
		return this._playByWebAudioApi();
	}
	else {
		goog.asserts.fail("Audio API is not available.");
		return false;
	}

};

synthjs.audiocore.Player.prototype.stop = function(){
	if( this._stopTimer ){
		this._stopTimer = null;
	}

	if( this._hasAudioDataApi ){
		this._status = 'stop';
		return this._stopByAudioDataApi();
	}
	else if( this._hasWebAudioApi ){
		this._status = 'stop';
		return this._stopByWebAudioApi();
	}
	else {
		return false;
	}
};

synthjs.audiocore.Player.prototype.eof = function(){
	var eof = true;
	goog.array.forEach(this._generatorList, function(gen){
		eof = eof && gen.eof();
	});

	return eof;
};

synthjs.audiocore.Player.prototype._getBufferDeferred = function(len){

	var dList = [];

	goog.array.forEach(this._generatorList, function(gen){
		if( !gen.eof() ){
			dList.push(gen.getBufferDeferred(len));
		}
	});

	var dWait = new goog.async.Deferred();
	return new goog.async.Deferred().addCallback(function(){
		new goog.async.DeferredList(dList)
			.addCallback(function(buffersList){
				var leftBufferTotal = new Float32Array(len),
					rightBufferTotal = new Float32Array(len);
				if( buffersList ){
					goog.array.forEach(buffersList, function(buffers){
						for(var i=0; i<len; i++){
							leftBufferTotal[i] += buffers[1].leftBuffer[i];
							rightBufferTotal[i] += buffers[1].rightBuffer[i];
						}
					});
				}
				buffersList = void 0;

				dWait.callback({leftBuffer: leftBufferTotal, rightBuffer: rightBufferTotal});
			});
		goog.array.forEach( dList, function(d){
			d.callback();
		});

	}).awaitDeferred(dWait);

};

synthjs.audiocore.Player.prototype._getWebAudioApiContext = function(){
    return this._WebAudioApiContext ||
        (this._WebAudioApiContext=new webkitAudioContext());
};

synthjs.audiocore.Player.prototype._getWebAudioApiJavaScriptNode = function(){
    return this._WebAudioApiNode ||
        (this._WebAudioApiNode=this._getWebAudioApiContext()['createJavaScriptNode'](this.STREAM_LENGTH, 1, 2));
};

/**
 * available for webkit
 * @private
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype._playByWebAudioApi = function(){
	var streamlength=2048;

	// if( !this._WebAudioApiContext ){
	// 	this._WebAudioApiContext = new webkitAudioContext();
	// 	this._WebAudioApiNode = this._WebAudioApiContext['createJavaScriptNode'](streamlength, 1, 2);// 2: channel
	// }

    var node = this._getWebAudioApiJavaScriptNode();
	// this._WebAudioApiNode['onaudioprocess'] = goog.bind(function(e){
    node['onaudioprocess'] = goog.bind(function(e){
		var self = this;
		if( this._isLatencyTimer ){
			this._latencyFrom = new Date();
		}
		var setBuffer = function(leftBuffer, rightsBuffer){
			while(i<self.STREAM_LENGTH){
				data0[i] = leftBuffer[i];
				data1[i] = rightsBuffer[i];
				i++;
			}
			if( self._isLatencyTimer ){
				var time = (new Date()).getTime() - self._latencyFrom.getTime();
				time /= 1000;
				self.dispatchEvent(new goog.events.Event(synthjs.audiocore.PlayerEventType.PUT_LATENCY, time));
			}
		};

		var data0 = e['outputBuffer']['getChannelData'](0),
			data1 = e['outputBuffer']['getChannelData'](1), i=0, arr;

		if( this.eof() ) {
			if( !this._stopTimer ){
				this._stopTimer = setTimeout(goog.bind(function(){
					this._stopTimer = null;
					this.stop();
				}, this), 100); // bufferにたまったAudioBufferをすべて吐き出すまで待つ。100msにしてあるの適当
			}

			arr = new Float32Array(self.STREAM_LENGTH);
			setBuffer(arr, arr);
		}
		else {
			var d = this._getBufferDeferred(self.STREAM_LENGTH)
			.addCallback(function(buffers){
				setBuffer(buffers.leftBuffer, buffers.rightBuffer);
				buffers = void 0;
				d = void 0;
			});

			// TODO: test
			d.callback();
		}

	}, this);
	// this._WebAudioApiNode['connect'](this._WebAudioApiContext['destination']);
    node['connect'](this._getWebAudioApiContext()['destination']);
	return true;
};

synthjs.audiocore.Player.prototype._stopByWebAudioApi = function(){
	// this._WebAudioApiNode['disconnect']();
    this._getWebAudioApiJavaScriptNode()['disconnect']();
	return true;
};

/**
 * available for firefox
 * @private
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype._playByAudioDataApi = function(){
	var audio = new Audio();
	var currentWritePosition=0,
		buffersize=this._sampleRate/4,
		maxBuffersize=8192,
		tail, player = this;

	audio['mozSetup'](1, this._sampleRate);

	var setBuffer = function(leftBuffer, rightBuffer){
		var buffer = new Float32Array(leftBuffer.length * 2);
		for(var i=0; i<leftBuffer.length; i++){
			buffer[2*i] = leftBuffer[i];
			buffer[2*i+1] = rightBuffer[i];
		}
		return audio['mozWriteAudio'](leftBuffer);
	};

	/** @private */
	this._audioDataApiTimer = setInterval(function(){
		if( player.eof()){
			player.stop();
			return;
		}

		var written;
		if( tail ){
			totaltail+=tail.length;
			written = audio['mozWriteAudio'](tail);
			currentWritePosition += written;
			tail = null;
		}

		var available = audio['mozCurrentSampleOffset']() + buffersize - currentWritePosition;
		if( available>0 && !player.eof() ){
			var readLength = available>=maxBuffersize ? maxBuffersize : available;
			var d = player._getBufferDeferred(readLength)
			.addCallback(function(buffers){
				written = setBuffer(buffers.leftBuffer, buffers.rightBuffer);

				// if( written < readLength ){
					// tail = soundData.subarray(written);
				// }
				currentWritePosition += written;
			});

			// TODO: test
			d.callback();

		}

	}, 100);

	return true;
};

synthjs.audiocore.Player.prototype._stopByAudioDataApi = function(gen){
	clearInterval(this._audioDataApiTimer);
	return true;
};

synthjs.audiocore.PlayerEventType = {
	PUT_LATENCY: 'put_latency'
};