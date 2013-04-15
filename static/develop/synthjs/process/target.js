goog.provide("synthjs.process.Target");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.utility.UUID");
goog.require("synthjs.process.MessageManager");

goog.scope(function(){

    /**
     * @constructor
     * @param {Window} win Target window.
     */
    var Target = synthjs.process.Target = function(win){
        goog.base(this);
        this._window = win;
        this._manager = synthjs.process.MessageManager.getInstance();
    };
    goog.inherits(Target, synthjs.utility.EventTarget);

    goog.object.extend(Target.prototype, {
        setHash: function(str){
            if( this._hash ){
                throw new Error();
            }
            this._hash = str;
            this._manager.addTarget(this);
        },
        disposeInternal: function(){
            this._manager.removeTarget(this);
            goog.base(this, 'disposeInternal');
        },
        getWindow: function(){
            return this._window;
        },
        postMessage: function(data){
            this._manager.postMessage(this, data);
        },
        postSyncMessage: function(){
            this._manager.postSyncMessage(this);
        },
        getHash: function(){
            return this._hash;
        },
        createHash: function(){
            if( this._hash ){
                throw new Error();
            }
            this.setHash( synthjs.utility.UUID.create() );
        }
    });

    goog.object.extend(Target, {
        loadDeferred: goog.abstractMethod
    });
});