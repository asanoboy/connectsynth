goog.provide("synthjs.audiocore.InstrumentHandler");
goog.provide("synthjs.audiocore.InstrumentQuery");

goog.require("synthjs.process.QueryHandler");
goog.require("synthjs.process.Query");


goog.scope(function(){

var D = synthjs.utility.Deferred;
/**
 * [ description]
 * @constructor
 * @param  {[type]} instrument [description]
 */
var Handler = synthjs.audiocore.InstrumentHandler = function(instrument){
    this._inst = instrument;
    goog.base(this);
};
goog.inherits(Handler, synthjs.process.QueryHandler);

goog.object.extend(Handler.prototype, {
    queryDeferredEach: function(obj){
        switch( obj['action'] ){
            case ActionType.GETBUFFER:
                return new D().addCallback(
                    goog.bind(
                        function(){
                            return this._inst.getBuffer(obj['length']);
                        },
                        this
                    )
                );
            case ActionType.SET:
                return new D().addCallback(
                    goog.bind(
                        function(){
                            return this._inst.setValue(obj['id'], obj['value']);
                        },
                        this
                    )
                );
            case ActionType.MIDION:
                return new D().addCallback(
                    goog.bind(
                        function(){
                            return this._inst.onNote(obj['note'], obj['velocity']);
                        },
                        this
                    )
                );
            case ActionType.MIDIOFF:
                return new D().addCallback(
                    goog.bind(
                        function(){
                            return this._inst.offNote(obj['note']);
                        },
                        this
                    )
                );
            case ActionType.MIDIALLOFF:
                return new D().addCallback(
                    goog.bind(
                        function(){
                            return this._inst.offAllNote();
                        },
                        this
                    )
                );
        }
    },
    reduceDeferred: function(list){
        var leftBuffer = [],
            rightBuffer = [],
            i;
        goog.array.forEach(list, function(buffers){
            if( buffers && buffers.leftbuffer && rightbuffer)
            for(i=0; i<buffers.leftbuffer.length; i++){
                leftBuffer.push(buffers.leftbuffer[i]);
                rightBuffer.push(buffers.rightbuffer[i]);
            }
        });
        return {
            leftBuffer: new Float32Array(leftBuffer),
            rightBuffer: new Float32Array(rightBuffer)
        };
    }
});

/**
 * [ description]
 * @constructor
 */
var Query = synthjs.audiocore.InstrumentQuery = function(){
    goog.base(this);
};

var ActionType = {
    GETBUFFER: 'getbuffer',
    SET: 'set',
    MIDION: 'on',
    MIDIOFF: 'off',
    MIDIALLOFF: 'alloff'
};
goog.inherits(Query, synthjs.process.Query);
goog.object.extend(Query.prototype, {
    pushGetBuffer: function(len){
        this.push({
            "action": ActionType.GETBUFFER,
            "length": len
        });
    },

    pushSet: function(id, value){
        this.push({
            "action": ActionType.SET,
            "id": id,
            "value": value
        });
    },

    pushNoteOn: function(noteid, velocity){
        this.push({
            "action": ActionType.MIDION,
            "note": noteid,
            "velocity": velocity/128
        });
    },

    pushNoteOff: function(noteid, velocity){
        this.push({
            "action": ActionType.MIDIOFF,
            "note": noteid,
            "velocity": velocity/128
        });
    },

    pushNoteAllOff: function(){
        this.push({
            "action": ActionType.MIDIALLOFF
        });
    }
});

});