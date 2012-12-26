goog.provide("synthjs.synthlib.Performer");

goog.require("synthjs.audiocore.Generator");
//goog.require("synthjs.data.Track");

goog.require("synthjs.utility.Deferred");
goog.require("synthjs.utility.DeferredList");

var D = synthjs.utility.Deferred;
var DL = synthjs.utility.DeferredList;

/** 
 * synthjs.data.Trackを読み込んで音を出す。
 * Trackの内容が変更されたら、動的に対応できるようにする。
 * trackにはScoreとWaveが設定されていないとエラーの可能性あり
 * @constructor
 * @param {synthjs.data.Track} track
 * @param {null|object} track
 * @implements synthjs.audiocore.Generator 
 */
synthjs.synthlib.Performer = function(track, opt_param){
	
	if( opt_param && opt_param.bpm ){
		this._bpm = opt_param.bpm;
	}
	else {
		this._bpm = 120;
	}
	
	/** @private */
	this._track = track;
	
	/** @private */
	this._score = track.getScore();
	
	/** @private */
	//this._wave = track.getWave();
	
	/** @private */
	this._filters = track.getFilters();
 	
	
	/** @private */
	this._dynamicGenerator = new synthjs.audiocore.DynamicGenerator(track.getWave());
	
	/**
	 * タイムライン上で現在指しているクロック。サンプリング単位
	 * @private */
	this._currentClock = 0;
	
	/**
	 * どの音を鳴らしてどの音を消すかを時系列に沿って配列にしておく。
	 * @private
	 */
	this._timeline = [];
	
	/**
	 * 今タイムライン上のどこにいるか。タイムラインの添え字
	 * -1の場合は初期化されていない
	 * @private
	 */
	this._needleIndex = -1;
	
	/**
	 * 初期はeofにしておく。
	 * ロードされた瞬間再生が始まってしまうため。
	 * @private
	 */
	this._eof = true;
	
	this.loadNotes();
};



/**
 * はじめに巻き戻す
 * @param {number} opt_offset 巻き戻す位置。beat単位
 */
synthjs.synthlib.Performer.prototype.rewind = function(opt_offset){
	var offset = opt_offset ? opt_offset : 0;
	
	// 古いdynamicGeneratorは捨てる
	this._dynamicGenerator = new synthjs.audiocore.DynamicGenerator(this._track.getWave(true));
	//console.log('rewind');
	this._dynamicGenerator.setSampleRate(this._sampleRate);
	this._needleIndex = 0;
	this._eof = false;
	this._currentClock = 0;
	
};

/**
 * this._scoreから出力用のバッファーに読み込む
 * @public
 */
synthjs.synthlib.Performer.prototype.loadNotes = function(){
	this._timeline = [];
	var noteInfos = this._score.getAllNoteInfos();
	goog.array.forEach(noteInfos, function(e){
		this._timeline.push({type:1, offset:e.offset, note: e.note });
		this._timeline.push({type:0, offset:e.offset+e.length, note:e.note });
	}, this);
	goog.array.sort(this._timeline, function(a,b){return a.offset-b.offset;});
	
	// this._needleIndexも更新する？
	if( this._timeline.length>0 ){
		this._needleIndex = 0;
	}
};


synthjs.synthlib.Performer.prototype.getBufferDeferred = function(len){
	if( !this._sampleRate ) throw new Error("Generator can't create buffer without setting sampleRate");
	
	
	// needleIndex==-1のときは、まだデータが入っていないので空のデータを返す
	if( this._needleIndex < 0 || this._needleIndex >= this._timeline.length){
		this._eof = true;
		
		return new D().addCallback(function(){
			return {leftBuffer: new Float32Array(len), rightBuffer: new Float32Array(len)};
		});
	}
	
	// len以内にtimeline上にイベントがない場合はそのままdynamicGeneratorにgetBufferしてもらう。
	if( this._currentClock+len < this._timeline[this._needleIndex].offset*this._sampleRate*60/this._bpm ){
		this._currentClock += len;
		return this._dynamicGenerator.getBufferDeferred(len);
	}

	var buf, offset, buflen, filled=0, to=this._currentClock+len;
	var thisPerformer = this;
	var dList = [];
	
	while( 1 ){
		
		if( this._timeline.length <= this._needleIndex ){
			// 再生終了
			this._eof = true;
			break;
		}
		
		offset = Math.floor(this._timeline[this._needleIndex].offset*this._sampleRate*60/this._bpm);
		if( offset > to ){
			buflen = len-filled;
			dList.push(this._dynamicGenerator.getBufferDeferred(buflen));
			break;
		}
		
		buflen = offset-this._currentClock;
		dList.push(
			this._dynamicGenerator.getBufferDeferred(buflen)
			.addCallback((function(index){
				return function(buffers){
					switch(thisPerformer._timeline[index].type){
						case 0:
							thisPerformer._dynamicGenerator.removeNoteDeferred(
								thisPerformer._timeline[index].note).callback();
							break;
						case 1:
							thisPerformer._dynamicGenerator.addNoteDeferred(
								thisPerformer._timeline[index].note).callback();
							break;
					}
					
					return buffers;
				};
			})(this._needleIndex))
		);
		
		filled += offset-this._currentClock;
		this._currentClock += buflen;
		this._needleIndex++;
	}
	
	var dWait = new D();
	return new D().addCallback(function(){
		new DL(dList).addCallback(function(buffersList){
			var leftBufferAll = new Float32Array(len);
			var rightBufferAll = new Float32Array(len);
			var offset=0;
			goog.array.forEach(buffersList, function(buffers){
				for(var i=0; i<buffers[1].leftBuffer.length; i++){
					leftBufferAll[i+offset] = buffers[1].leftBuffer[i];
					rightBufferAll[i+offset] = buffers[1].rightBuffer[i];
				}
				offset += buffers[1].leftBuffer.length;
			});
			return {leftBuffer: leftBufferAll, rightBuffer: rightBufferAll};
		}).assocChainDeferred(dWait);
		
		goog.array.forEach(dList, function(d){
			setTimeout(function(){d.callback();}, 0);
		});
	}).awaitDeferred(dWait);
};

/**
 * @param {number}
 */
synthjs.synthlib.Performer.prototype.setSampleRate = function(sampleRate){
	/** @private */
	this._sampleRate = sampleRate;
	this._dynamicGenerator.setSampleRate(sampleRate);

	for( var i=0; i<this._filters.length; i++){
		rt = this._filters[i].setSampleRate(sampleRate);
	}
};


/**
 * @return {boolean}
 */
synthjs.synthlib.Performer.prototype.eof = function(){
	return this._eof;
	
};
