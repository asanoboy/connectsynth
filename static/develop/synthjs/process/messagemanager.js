goog.provide("synthjs.process.MessageManager");

goog.require("synthjs.utility.EventTarget");
goog.require("goog.events.Event");

goog.scope(function(){
    var MessageManager = synthjs.process.MessageManager = function(){
        goog.base(this);
        this._targetHash = {};
        this._unknownTarget = new synthjs.utility.EventTarget();
        window.addEventListener("message", goog.bind(this.listener, this));
    };
    goog.inherits(MessageManager, synthjs.utility.EventTarget);
    goog.addSingletonGetter(MessageManager);

    goog.object.extend(MessageManager.prototype, {
        getUnknownTarget: function(){
            return this._unknownTarget;
        },
        listener: function(e){
            if( e.data.hash && e.data.type){
                switch(e.data.type){
                    case synthjs.process.MessageType.SYNC:
                        if( this._targetHash[e.data.hash] ){
                            this._targetHash[e.data.hash].dispatchEvent(
                                new goog.events.Event(
                                    synthjs.process.EventType.SYNC,
                                    e
                                )
                            );
                        }
                        else {
                            this._unknownTarget.dispatchEvent(
                                new goog.events.Event(
                                    synthjs.process.EventType.SYNC,
                                    e
                                )
                            );
                        }
                        break;
                    case synthjs.process.MessageType.MESSAGE:
                        if( this._targetHash[e.data.hash] ){
                            this._targetHash[e.data.hash].dispatchEvent(
                                new goog.events.Event(
                                    synthjs.process.EventType.MESSAGE,
                                    e.data.data
                                ));
                        }
                        else {
                            this.dispatchEvent(
                                new goog.events.Event(
                                    synthjs.process.EventType.UNKNOWN_MESSAGE,
                                    e
                                ));
                        }
                        break;
                    default:
                        this.dispatchEvent(
                            new goog.events.Event(
                                synthjs.process.EventType.UNKNOWN_MESSAGE,
                                e
                            ));
                    break;
                }
            }
        },
        postMessage: function(target, data){
            target.getWindow().postMessage({
                'type': synthjs.process.MessageType.MESSAGE,
                'hash': target.getHash(),
                'data': data
            },
            document.location.origin);
        },
        postSyncMessage: function(target){
            target.getWindow().postMessage({
                'type': synthjs.process.MessageType.SYNC,
                'hash': target.getHash()
            },
            document.location.origin);
        },
        addTarget: function(target){
            this._targetHash[target.getHash()] = target;
        },
        removeTarget: function(target){
            delete this._targetHash[target.getHash()];
        }
    });

});