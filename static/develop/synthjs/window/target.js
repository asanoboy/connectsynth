goog.provide("synthjs.window.Target");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.utility.UUID");

goog.scope(function(){
    /**
     * @constructor
     * @param {Window} win Target window.
     */
    var Target = synthjs.window.Target = function(win){
        goog.base(this);
        this._window = win;

    };
    goog.inherits(Target, synthjs.utility.EventTarget);

    goog.object.extend(Target, {
        bindStart: function(){
            var timer = setInterval(goog.bind(function(){
                this._window.postMessage({
                    'type': synthjs.window.MessageType.SYNC,
                    'data': this.getHash()
                },
                document.location.origin);
            }, this),  100);
        },
        postMessage: function(){

        },
        listener: function(){

        },
        getHash: function(){
            return this._hash ? this._hash :
                (this._hash = synthjs.utility.UUID.create());
        }
    });
});