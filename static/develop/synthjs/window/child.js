goog.provide("synthjs.window.Child");

goog.require("synthjs.window.Target");
goog.require("synthjs.utility.Deferred");
goog.require("synthjs.window.MessageType");


goog.scope(function(){

    var Child = synthjs.window.Child = function(win){
        goog.base(this, win);
    };
    goog.inherits(Child, synthjs.window.Target);

    goog.object.extend(Child.prototype, {
        disposeInternal: function(){
            goog.base(this, 'disposeInternal');
            this._window.close();
        }
    });

    goog.object.extend(Child, {
        loadDeferred: function(url){
            var d = new synthjs.utility.Deferred(),
                dWait = new synthjs.utility.Deferred();

            d.addCallbacks(function(){
                var win = window.open(url);
                var child = new Child(win);
                child.createHash();
                var timer = setInterval(function(){
                    child.postSyncMessage();
                }, 100);

                var handler = new goog.events.EventHandler();
                var listener = function(){
                    clearInterval(timer);
                    handler.dispose();
                    dWait.callback( child );
                };
                handler.listen(
                    child,
                    synthjs.window.EventType.SYNC,
                    listener);

            }).awaitDeferred(dWait);

            return d;

        }
    });

});

