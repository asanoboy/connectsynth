goog.provide("synthjs.process.Parent");

goog.require("synthjs.process.Target");
goog.require("synthjs.process.MessageType");
goog.require("synthjs.utility.Deferred");



goog.scope(function(){
    var isWorker = !("document" in goog.global);
    var Parent = synthjs.process.Parent = function(win){
        goog.base(this, win);
    };
    goog.inherits(Parent, synthjs.process.Target);

    goog.object.extend(Parent.prototype, {
    });

    goog.object.extend(Parent, {
        loadDeferred: function(){
            if( isWorker ){
                return new synthjs.utility.Deferred().addCallback(function(){
                    return new Parent();
                });
            }
            var d = new synthjs.utility.Deferred(),
                dWait = new synthjs.utility.Deferred();

            d.addCallbacks(function(){
                var handler = new goog.events.EventHandler();
                var listener = function(e){
                    var parent = new Parent(e.target.source);
                    parent.setHash(e.target.data.hash);
                    parent.postSyncMessage();
                    handler.dispose();
                    dWait.callback(parent);
                };
                handler.listen(
                    synthjs.process.MessageManager.getInstance().getUnknownTarget(),
                    synthjs.process.EventType.SYNC,
                    listener);
            }).awaitDeferred(dWait);

            return d;
        }
    });
});