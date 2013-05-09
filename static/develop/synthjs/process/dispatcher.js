goog.provide("synthjs.process.Dispatcher");

goog.require("synthjs.process.Parent");
goog.require("synthjs.process.EventType");
goog.require("synthjs.utility.EventTarget");

goog.scope(function(){

/**
 * This is abstract class and dispatches query from parent process.
 * @constructor
 */
var Dispatcher = synthjs.process.Dispatcher = function(){
    goog.base(this);
    this._parent = null;
    synthjs.process.Parent.loadDeferred()
        .addCallbacks(goog.bind(this.listenMessage, this))
        .callback();
};
goog.inherits(Dispatcher, synthjs.utility.EventTarget);

goog.object.extend(Dispatcher.prototype, {
    listenMessage: function(p){
        this._parent = p;
        this.getHandler().listen(
            this._parent,
            synthjs.process.EventType.MESSAGE,
            this.onMessage,
            this);
    },

    /**
     * @protected
     * @param  {goog.events.Event} e [description]
     * @return {[type]}   [description]
     */
    onMessage: function(e){
        // Don't use dot notation for 'target'.
        var d = this.queryDeferred(e['target']);
        if( 'callback' in e['target'] ){
            d.addCallback(goog.bind(
                function(r){
                    r['callback'] = e['target']['callback'];
                    this._parent.postMessage(r);
                },
                this)
            );
        }
        d.callback();
    },

    queryDeferred: goog.abstractMethod
});
});