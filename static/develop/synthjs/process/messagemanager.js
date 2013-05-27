goog.provide("synthjs.process.MessageManager");

goog.require("synthjs.utility.EventTarget");
goog.require("goog.events.Event");

goog.scope(function(){
var isWorker = 'self' in goog.global && goog.global === goog.global.self;
var MessageManager = synthjs.process.MessageManager = function(){
    goog.base(this);
    this._targetHash = {};
    this._unknownTarget = new synthjs.utility.EventTarget();
    goog.global.addEventListener("message", goog.bind(this.listener, this));
};
goog.inherits(MessageManager, synthjs.utility.EventTarget);
goog.addSingletonGetter(MessageManager);

goog.object.extend(MessageManager.prototype, {
    getUnknownTarget: function(){
        return this._unknownTarget;
    },
    // getListener: function(){
    //     return this._listener || (this._listener=goog.bind(this.listener, this));
    // },
    listener: function(e){
        if( !goog.isObject(e.data) || !('hash' in e.data) || !('type' in e.data)){
            return;
        }
        // if( e.data.hash && e.data.type){
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
        // }
    },
    postMessage: function(target, data){
        goog.asserts.assert(!target.isWorker());
        // if( target.isWorker() ){
        //     target.getWorker().postMessage({
        //         'type': synthjs.process.MessageType.MESSAGE,
        //         'hash': target.getHash(),
        //         'data': data
        //     });
        // }
        // else {
            target.getWindow().postMessage({
                'type': synthjs.process.MessageType.MESSAGE,
                'hash': target.getHash(),
                'data': data
            },
            document.location.origin);
        // }
    },
    postSyncMessage: function(target){
        goog.asserts.assert(!target.isWorker());
        // if( target.isWorker() ){
        //     target.getWorker().postMessage({
        //         'type': synthjs.process.MessageType.SYNC,
        //         'hash': target.getHash()
        //     });
        // }
        // else {
            target.getWindow().postMessage({
                'type': synthjs.process.MessageType.SYNC,
                'hash': target.getHash()
            },
            document.location.origin);
        // }
    },
    addTarget: function(target){
        this._targetHash[target.getHash()] = target;
        // if( target.isWorker() ){
        //     target.getWorker().addEventListener(this.getListener());
        // }
    },
    removeTarget: function(target){
        delete this._targetHash[target.getHash()];
        // if( target.isWorker() ){
        //     target.getWorker().addEventListener(this.getListener());
        // }
    }
});

});