goog.provide("synthjs.audiocore.ComposerSequenceDispatcher");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.audiocore.ComposerSequence");
goog.require("synthjs.audiocore.ComposerSequenceEventType");
goog.require("synthjs.audiocore.ComposerSequenceHandler");

goog.scope(function(){

var SequenceEventType = synthjs.audiocore.ComposerSequenceEventType;

/**
 * It is concerned that this is constructed on Worker process. 
 * Dispatches every event to DynamicGenerator.
 * @constructor
 */
var Receiver = synthjs.audiocore.ComposerSequenceDispatcher = function(){
    goog.base(this);
    this._sequenceHandler = new synthjs.audiocore.ComposerSequenceHandler();

    this._waveidToGenerator = {};
    this._listenHandler();
    this._waveidToSequence = {};
    this._sequenceidToWaitDeferred = {};
};
goog.inherits(Receiver, synthjs.utility.EventTarget);



goog.object.extend(Receiver.prototype, {

    _listenHandler: function(){
        var h = this._sequenceHandler;
        this.getHandler().listen(
            h,
            SequenceEventType.SET_WAVE_PARAM,
            this.onSetWaveParam,
            this)
        .listen(
            h,
            SequenceEventType.GET_BUFFER,
            this.onGetBuffer,
            this)
        .listen(
            h,
            SequenceEventType.CREATE_WAVE,
            this.onCreateWave,
            this)
        .listen(
            h,
            SequenceEventType.REMOVE_WAVE,
            this.onRemoveWave,
            this)
        .listen(
            h,
            SequenceEventType.NOTEON,
            this.onNoteOn,
            this)
        .listen(
            h,
            SequenceEventType.NOTEOFF,
            this.onNoteOff,
            this)
        .listen(
            h,
            SequenceEventType.NOTEALLOFF,
            this.onNoteAllOff,
            this)
        .listen(
            h,
            SequenceEventType.START,
            this.onStart,
            this)
        .listen(
            h,
            SequenceEventType.FINISH,
            this.onFinish,
            this)
        ;
    },

    queryDeferred: function(sequenceObject){

        var sequenceArray = sequenceObject['sequence'],
            seqid = sequenceObject['id'];
        if( seqid in this._sequenceidToWaitDeferred ){
            goog.asserts.fail("Thread unsafe error.");
        }

        var dWait = new synthjs.utility.Deferred();
        // this._setSequenceDeferred = new synthjs.utility.Deferred()
        this._sequenceidToWaitDeferred[seqid] = new synthjs.utility.Deferred()
            .addCallback(goog.bind(function(){
                var dList = [];
                goog.object.forEach(this._waveidToGenerator, function(gen, waveid){
                    dList.push(gen.querySequenceDeferred(this._waveidToSequence[waveid]));
                }, this);

                new goog.async.DeferredList(dList)
                    .addCallback(goog.bind(this.assembleBuffers, this))
                    // .addCallback(function(){console.log("aaa");})
                    // .chainDeferred(dWait.addCallback( function(){console.log('a');} ));
                    .chainDeferred(dWait);

                goog.array.forEach(dList, function(d){
                    d.callback();
                });
            }, this))
            .awaitDeferred(dWait);

        return new synthjs.utility.Deferred()
            .addCallback(goog.bind(function(){
                this._sequenceHandler.dispatchSequence(sequenceObject);
            }, this))
            .awaitDeferred(this._sequenceidToWaitDeferred[seqid]);
    },

    assembleBuffers: function(buffersList){
        var leftBuffer, rightBuffer,
            len = buffersList[0][1].leftBuffer.length;
        var result = {
            leftBuffer: (leftBuffer=new Float32Array(len)),
            rightBuffer: (rightBuffer=new Float32Array(len))};
        var i = 0;
        goog.array.forEach(buffersList, function(buffers){
            for( var j=0; j<buffers[1].leftBuffer.length; j++ ){
                result.leftBuffer[i] = buffers[1].leftBuffer[j];
                result.rightBuffer[i] = buffers[1].rightBuffer[j];
                i++;
            }
        });
        return result;
    },

    onStart: function(e){
        this._waveidToSequence = {};
        goog.object.forEach(this._waveidToGenerator, function(gen, id){
            this._waveidToSequence[id] = new synthjs.audiocore.DynamicGeneratorSequence();
        }, this);
    },

    onFinish: function(e){
        var seqid = e.target.seqid;
        // console.log(this._sequenceidToWaitDeferred);
        if( seqid in this._sequenceidToWaitDeferred ){
            // this._setSequenceDeferred.callback();
            this._sequenceidToWaitDeferred[seqid].callback();
            this._sequenceidToWaitDeferred[seqid] = null;
        }
        else {
            goog.asserts.fail("Finished sequence does not exist.");
        }
    },

    onNoteOn: function(e){
        var waveid = e.target.waveid;
        this._waveidToSequence[waveid].pushNoteOn(e.target.noteid, e.target.velocity);
    },

    onNoteOff: function(e){
        var waveid = e.target.waveid;
        this._waveidToSequence[waveid].pushNoteOff(e.target.noteid, e.target.velocity);
    },

    onNoteAllOff: function(e){
        var waveid = e.target.waveid;
        this._waveidToSequence[waveid].pushNoteAllOff();
    },

    onSetWaveParam: function(e){
        var waveid = e.target.waveid;
        this._waveidToSequence[waveid].pushSet(e.target.name, e.target.value);
    },

    onGetBuffer: function(e){
        var waveid = e.target.waveid;
        this._waveidToSequence[waveid].pushGetBuffer(e.target.length);
    },

    onCreateWave: function(e){
        var waveid = e.target.waveid;
        if( waveid in this._waveidToGenerator ) {
            goog.asserts.fail("Waveid is duplicated.");
        }
        var generator = synthjs.audiocore.DynamicGenerator.createFromUrl(
            e.target.url, e.target.sampleRate
        );
        this._waveidToGenerator[waveid] = generator;
        this._waveidToSequence[waveid] = new synthjs.audiocore.DynamicGeneratorSequence();
    },

    onRemoveWave: function(e){
        if( !(waveid in this._waveidToGenerator) ) {
            goog.asserts.fail("Waveid does not exist.");
        }

        this._waveidToGenerator[waveid] = null;
    }

});

});