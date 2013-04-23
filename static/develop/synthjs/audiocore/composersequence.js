goog.provide("synthjs.audiocore.ComposerSequence");
goog.provide("synthjs.audiocore.ComposerSequenceType");
goog.provide("synthjs.audiocore.ComposerSequenceHandler");
goog.provide("synthjs.audiocore.ComposerSequenceEventType");

goog.require("synthjs.utility.EventTarget");
goog.require("goog.object");

goog.scope(function(){

var sequenceCurrentId = 0;
var Sequence = synthjs.audiocore.ComposerSequence = function(){
    this._array = [];
    this._id = ++sequenceCurrentId;
};

// goog.object.extend(Sequence, {});

goog.object.extend(Sequence.prototype, {
    join: function(sequence){
        this._array = this._array.concat(sequence.getDump()['sequence']);
    },

    pushNoteOn: function(waveid, noteid, velocity){
        this._array.push({
            'type': SequenceType.NOTEON,
            'waveid': waveid,
            'noteid': noteid,
            'velocity': velocity
        });
    },

    pushNoteOff: function(waveid, noteid, velocity){
        this._array.push({
            'type': SequenceType.NOTEOFF,
            'waveid': waveid,
            'noteid': noteid,
            'velocity': velocity
        });
    },

    pushNoteAllOff: function(waveid){
        this._array.push({
            'type': SequenceType.NOTEALLOFF,
            'waveid': waveid
        });
    },

    pushSetWaveParam: function(waveid, name, value){
        this._array.push({
            'type': SequenceType.SET_WAVE_PARAM,
            'waveid': waveid,
            'name': name,
            'value': value
        });
    },

    pushGetBuffer: function(waveid, length){
        this._array.push({
            'type': SequenceType.GET_BUFFER,
            'waveid': waveid,
            'length': length
        });
    },

    pushCreateWave: function(waveid, url, sampleRate){
        this._array.push({
            'type': SequenceType.CREATE_WAVE,
            'waveid': waveid,
            'url': url,
            'sampleRate': sampleRate
        });
    },

    pushRemoveWave: function(waveid){
        this._array.push({
            'type': SequenceType.REMOVE_WAVE,
            'waveid': waveid
        });
    },

    getDump: function(){
        return {
            "sequence": this._array,
            'id': this._id
        };
    }
});

var SequenceType = synthjs.audiocore.ComposerSequenceType = {
    SET_WAVE_PARAM: 'set-wave-param',
    GET_BUFFER: 'get-buffer',
    CREATE_WAVE: 'create-wave',
    REMOVE_WAVE: 'remove-wave',

    NOTEON: 'noteon',
    NOTEOFF: 'noteoff',
    NOTEALLOFF: 'notealloff',

    START: 'start', // only for EventType
    FINISH: 'finish' //only for EventType
};

var EventType = synthjs.audiocore.ComposerSequenceEventType = SequenceType;

var Handler = synthjs.audiocore.ComposerSequenceHandler = function(){
    goog.base(this);
};
goog.inherits(Handler, synthjs.utility.EventTarget);

goog.object.extend(Handler.prototype, {
    dispatchSequence: function(sequenceObject){
        var sequenceArray = sequenceObject['sequence'],
            seqid = sequenceObject['id'];

        this.dispatchEvent(new goog.events.Event(
            EventType.START,
            {
                seqid: seqid
            }
        ));
        goog.array.forEach(sequenceArray, function(proc){
            switch(proc['type']){
                case SequenceType.NOTEON:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.NOTEON,
                        {
                            waveid: proc['waveid'],
                            noteid: proc['noteid'],
                            velocity: proc['velocity']
                        }
                    ));
                    break;
                case SequenceType.NOTEOFF:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.NOTEOFF,
                        {
                            waveid: proc['waveid'],
                            noteid: proc['noteid'],
                            velocity: proc['vecolity']
                        }
                    ));
                    break;
                case SequenceType.NOTEALLOFF:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.NOTEALLOFF,
                        {
                            waveid: proc['waveid']
                        }
                    ));
                    break;
                case SequenceType.SET_WAVE_PARAM:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.SET_WAVE_PARAM,
                        {
                            waveid: proc['waveid'],
                            name: proc['name'],
                            value: proc['value']
                        }
                    ));
                    break;
                case SequenceType.GET_BUFFER:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.GET_BUFFER,
                        {
                            waveid: proc['waveid'],
                            length: proc['length']
                        }
                    ));
                    break;
                case SequenceType.CREATE_WAVE:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.CREATE_WAVE,
                        {
                            waveid: proc['waveid'],
                            sampleRate: proc['sampleRate'],
                            url: proc['url']
                        }
                    ));
                    break;
                case SequenceType.REMOVE_WAVE:
                    this.dispatchEvent(new goog.events.Event(
                        EventType.REMOVE_WAVE,
                        {
                            waveid: proc['waveid']
                        }
                    ));
                    break;
            }
        }, this);

        this.dispatchEvent(new goog.events.Event(
            EventType.FINISH,
            {
                seqid: seqid
            }
        ));
    }
});

});
