goog.provide("synthjs.process.Target");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.utility.UUID");
goog.require("synthjs.process.MessageManager");

goog.scope(function(){

    /**
     * @constructor
     * @param {Window|Worker} win Target window.
     */
    var Target = synthjs.process.Target = function(win){
        goog.base(this);
        this._isWorkerChild = !win;
        this._isWorker = "Worker" in goog.global && win instanceof Worker;
        if( this._isWorker ){
            win.addEventListener("message", this.getWorkerListener());
        }
        else if( this._isWorkerChild ){
            addEventListener("message", this.getWorkerListener());
        }
        this._windowOrWorker = win;
        this._manager = synthjs.process.MessageManager.getInstance();
    };
    goog.inherits(Target, synthjs.utility.EventTarget);

    goog.object.extend(Target.prototype, {
        /**
         * Only for WebWorker.
         * @return {[type]} [description]
         */
        getWorkerListener: function(){
            return this._workerListenerBinded ||
                (this._workerListenerBinded=goog.bind(this.workerListener, this));
        },

        /**
         * Only for WebWorker.
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        workerListener: function(e){
            this.dispatchEvent(
                new goog.events.Event(
                    synthjs.process.EventType.MESSAGE,
                    e.data)
                );
        },
        setHash: function(str){
            goog.asserts.assert(!this._hash);
            // if( this._hash ){
            //     throw new Error();
            // }
            this._hash = str;
            this._manager.addTarget(this);
        },
        disposeInternal: function(){
            this._manager.removeTarget(this);
            goog.base(this, 'disposeInternal');
        },
        isWorker: function(){
            return this._isWorker;
        },
        getWorker: function(){
            goog.asserts.assert(this._isWorker);
            return this._windowOrWorker;
        },
        getWindow: function(){
            goog.asserts.assert(!this._isWorker);
            return this._windowOrWorker;
        },
        postMessage: function(data){
            // console.log("=====PostMessage in Target");
            if( this._isWorker ){
                this._windowOrWorker.postMessage(data);
            }
            else if( this._isWorkerChild ){
                postMessage(data);
            }
            else {
                this._manager.postMessage(this, data);
            }
        },
        postSyncMessage: function(){
            if( this._isWorker ){
                // Do nothing.
            }
            else {
                this._manager.postSyncMessage(this);
            }
        },
        getHash: function(){
            return this._hash;
        },
        createHash: function(){
            goog.asserts.assert(!this._hash);
            // if( this._hash ){
            //     throw new Error();
            // }
            this.setHash( synthjs.utility.UUID.create() );
        }
    });

    goog.object.extend(Target, {
        loadDeferred: goog.abstractMethod
    });
});