goog.provide("synthjs.window.Parent");

goog.require("synthjs.window.Target");
goog.require("synthjs.window.MessageType");
goog.require("synthjs.utility.Deferred");


goog.scope(function(){

    var Parent = synthjs.window.Parent = function(win){
        goog.base(this, win);
    };
    goog.inherits(Parent, synthjs.window.Target);

    goog.object.extend(Parent.prototype, {
    });

    goog.object.extend(Parent, {
        loadDeferred: function(){
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
                    synthjs.window.MessageManager.getInstance().getUnknownTarget(),
                    synthjs.window.EventType.SYNC,
                    listener);
            }).awaitDeferred(dWait);

            return d;
        }
    });
});