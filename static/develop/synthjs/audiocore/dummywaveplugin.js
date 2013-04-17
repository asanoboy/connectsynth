goog.provide("synthjs.audiocore.DummyWavePlugin");

goog.require("synthjs.utility.EventTarget");

goog.scope(function(){

var Wave = synthjs.audiocore.DummyWavePlugin = function(url, sampleRate){
    goog.base(this);
    this._url = url;
    this._sampleRate = sampleRate;
    this._params = {};
};
goog.inherits(Wave, synthjs.utility.EventTarget);

goog.object.extend(Wave, {
    EventType: {
        CHANGE_SAMPLERATE: 'change-samplerate',
        CHANGE_PARAM: 'change-param'
    }
});

goog.object.extend(Wave.prototype, {
    getUrl: function(){
        return this._url;
    },
    getSampleRate: function(){
        return this._sampleRate;
    },
    setSampleRate: function(){
        goog.asserts.fail("Has not implemented yet.");
    },
    setParam: function(name, value){
        this._params[name] = value;
        this.dispatchEvent(
            new goog.events.Event(
                Wave.EventType.CHANGE_PARAM,
                {
                    name: name,
                    value: value
                }));
    }

});

});