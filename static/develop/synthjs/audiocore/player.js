goog.provide("synthjs.audiocore.Player");

goog.require("synthjs.audiocore.Generator");
goog.require('goog.object');
goog.require('goog.pubsub.PubSub');
goog.require('goog.debug.Logger');

/** @const */
var SAMPLE_RATE = 48000;

/** @constructor */
synthjs.audiocore.Player = function(){
	/** @private */
	this._sampleRate = SAMPLE_RATE;
	
	/** @private */
	this._pubsub = new goog.pubsub.PubSub();
	
	/** @private */
	this._keysPubsub = [];
	
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
	this._generatorList = {};
	
	/** @private */
	this._generatorCurrentIndex = 0;
	
	/** @private */
	this._status = 'stop';
};

goog.addSingletonGetter(synthjs.audiocore.Player);

synthjs.audiocore.Player.logger = goog.debug.Logger.getLogger('synthjs.audiocore.Player');
synthjs.audiocore.Player.logger.setLevel(goog.debug.Logger.Level.ALL);

/**
 * @param {string}
 * @param {function()}
 */
synthjs.audiocore.Player.prototype.on = function(topic, callback){
	this._keysPubsub.push(this._pubsub.subscribe(topic, callback));
	
};

/** 
 * @private
 * @param {string}
 */
synthjs.audiocore.Player.prototype._eventDispatch = function(topic){
	this._pubsub.publish(topic);
};


/**
 * @public
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype.addGenerator = function(gen){
	
	gen.setSampleRate(this._sampleRate);
	var index = this._generatorCurrentIndex++;
	this._generatorList[index] = gen;
	return index;
}

/**
 * @public
 * @param {number}
 */
synthjs.audiocore.Player.prototype.removeGeneratorAt = function(index){
	delete this._generatorList[index];
}

synthjs.audiocore.Player.prototype.removeGenerator = function(generator){
	console.trace();
	goog.object.forEach(this._generatorList, function(val, key){
		if( generator == val ){
			delete this._generatorList[key];
		}
	}, this);
}

/**
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype.play = function(){
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
		goog.asserts.fail("Audio API is not available.")
		return false;
	}
	
}

synthjs.audiocore.Player.prototype.clearEventHandler = function(){
	this._pubsub.dispose();
	this._pubsub = new goog.pubsub.PubSub();
}

synthjs.audiocore.Player.prototype.stop = function(){
	
	if( this._hasAudioDataApi ){
		this._pubsub.publish('finish');
		this._status = 'stop';
		return this._stopByAudioDataApi();
	}
	else if( this._hasWebAudioApi ){
		this._pubsub.publish('finish');
		this._status = 'stop';
		return this._stopByWebAudioApi();
	}
	else {
		return false;
	}
}

synthjs.audiocore.Player.prototype.eof = function(){
	var eof = true;
	
	goog.object.forEach(this._generatorList, function(gen){
		eof = eof && gen.eof();
	});

	return eof;
};

synthjs.audiocore.Player.prototype._getBufferDeferred = function(len){
	
	var dList = [];
	
	goog.object.forEach(this._generatorList, function(gen){
		if( !gen.eof() ){
			dList.push(gen.getBufferDeferred(len));
		}
	});
	
	var dWait = new goog.async.Deferred();
	var d = new goog.async.Deferred().addCallback(function(){
		var dGens = new goog.async.DeferredList(dList)
			.addCallback(function(buffersList){
				var leftBufferTotal = new Float32Array(len),
					rightBufferTotal = new Float32Array(len);
				if( buffersList ){
					goog.array.forEach(buffersList, function(buffers){
						for(var i=0; i<len; i++){
							leftBufferTotal[i] += buffers[1].leftBuffer[i];
							rightBufferTotal[i] += buffers[1].rightBuffer[i];
						}
					})
				}
				buffersList = void 0;
				return {leftBuffer: leftBufferTotal, rightBuffer: rightBufferTotal};	
			}).chainDeferred(dWait);
		goog.array.forEach( dList, function(d){
			d.callback();
		});
				
	}).awaitDeferred(dWait);
	
	
	return d;
	
	// var d = new goog.async.DeferredList(dList)
	// .addCallback(function(buffersList){
		// var leftBufferTotal = new Float32Array(len),
			// rightBufferTotal = new Float32Array(len);
		// if( buffersList ){
			// goog.array.forEach(buffersList, function(buffers){
				// for(var i=0; i<len; i++){
					// leftBufferTotal[i] += buffers[1].leftBuffer[i];
					// rightBufferTotal[i] += buffers[1].rightBuffer[i];
				// }
			// })
		// }
// 		
		// return {leftBuffer: leftBufferTotal, rightBuffer: rightBufferTotal};	
	// })
// 	
	// return d;	
};


/**
 * available for webkit
 * @private
 * @param {synthjs.audiocore.Generator}
 */
synthjs.audiocore.Player.prototype._playByWebAudioApi = function(){
	var streamlength=2048, player=this;
	
	if( !this._WebAudioApiContext ){
		this._WebAudioApiContext = new webkitAudioContext();
		this._WebAudioApiNode = this._WebAudioApiContext['createJavaScriptNode'](streamlength, 1, 2);// 2: channel
	}
	
	
	this._WebAudioApiNode['onaudioprocess'] = function(e){
		
		var setBuffer = function(leftBuffer, rightsBuffer){
			while(i<streamlength){
				data0[i] = leftBuffer[i];
				data1[i] = rightsBuffer[i];
				i++;
			}
		}
		
		var data0 = e['outputBuffer']['getChannelData'](0), 
			data1 = e['outputBuffer']['getChannelData'](1), i=0, arr;
		
		if( player.eof() ) {
			setTimeout(function(){player.stop();}, 100); // bufferにたまったAudioBufferをすべて吐き出すまで待つ。100msにしてあるの適当
			arr = new Float32Array(streamlength);
			setBuffer(arr, arr);
		}
		else {
			var d = player._getBufferDeferred(streamlength)
			.addCallback(function(buffers){
				var d1 = new Date();
				setBuffer(buffers.leftBuffer, buffers.rightBuffer);
				buffers = void 0;
				d = void 0;
			});
			
			// TODO: test
			d.callback();
		}
			
	}
	this._WebAudioApiNode['connect'](this._WebAudioApiContext['destination']);
	
	return true;	
}

synthjs.audiocore.Player.prototype._stopByWebAudioApi = function(){
	this._WebAudioApiNode['disconnect']();
	return true;
}

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
	}
	
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
			tail = null
		}
		
		var available = audio['mozCurrentSampleOffset']() + buffersize - currentWritePosition;
		if( available>0 && !player.eof() ){
			var readLength = available>=maxBuffersize ? maxBuffersize : available;
// 			
			var d = player._getBufferDeferred(readLength)
			.addCallback(function(buffers){
				written = setBuffer(buffers.leftBuffer, buffers.rightBuffer);
				
				if( written < readLength ){
					tail = soundData.subarray(written);
				}
				currentWritePosition += written;
			});
			
			// TODO: test
			d.callback();
			
			// var soundData = player._getBuffer(readLength);
// 			
			// written = audio['mozWriteAudio'](soundData);
			// if( written < readLength ){
				// tail = soundData.subarray(written);
			// }
			
			// currentWritePosition += written;
		}
		
	}, 100);

	return true;
}

synthjs.audiocore.Player.prototype._stopByAudioDataApi = function(gen){
	clearInterval(this._audioDataApiTimer);
	return true;
};