goog.provide("synthjs.process.Dispatcher");

goog.require("synthjs.process.Parent");
goog.require("synthjs.process.EventType");
goog.require("synthjs.utility.EventTarget");

goog.scope(function(){

/**
 * This is abstract class and dispatches query from parent process.
 * @constructor
 */
var Dispatcher = synthjs.process.Dispatcher = function(handler){
    goog.base(this);
    this._queryHandler = handler;
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

    getQueryHandler: function(){
        return this._queryHandler;
    },

    /**
     * @protected
     * @param  {goog.events.Event} e [description]
     * @return {[type]}   [description]
     */
    onMessage: function(e){
        // Don't use dot notation for 'target'.
        goog.asserts.assert("callback" in e["target"]);
        goog.asserts.assert("query" in e["target"]);
        var callbackname = e['target']['callback'];
        var d = new synthjs.utility.Deferred(),
            results = [];
        goog.array.forEach(e['target']['query'], function(q){
            d.assocChainDeferred(
                this._queryHandler.queryDeferredEach(q)
                .addCallback(function(r){
                    results.push(r);
                })
            );
        }, this);

        d.addCallback(goog.bind(function(){
            this._queryHandler.reduceDeferred(results)
            .addCallback(goog.bind(function(r){
                this._parent.postMessage({
                    'callback': callbackname,
                    'result': r
                });
            }, this)).callback();
        }, this))
        .callback();
        // var d = this.queryDeferred(e['target']);


        // if( 'callback' in e['target'] ){
        //     d.addCallback(goog.bind(
        //         function(r){
        //             r['callback'] = e['target']['callback'];
        //             this._parent.postMessage(r);
        //         },
        //         this)
        //     );
        // }
        // d.callback();
    }

    // queryDeferred: goog.abstractMethod
});
});