goog.provide("synthjs.process.Child");

goog.require("goog.dom");
goog.require("goog.style");
goog.require("synthjs.process.Target");
goog.require("synthjs.utility.Deferred");
goog.require("synthjs.process.MessageType");


goog.scope(function(){

    // var isWorker = 'self' in this && this['self']==this;

    var Child = synthjs.process.Child = function(win){
        goog.base(this, win);
    };
    goog.inherits(Child, synthjs.process.Target);

    goog.object.extend(Child.prototype, {
        disposeInternal: function(){
            goog.base(this, 'disposeInternal');
            this._window.close();
        }
    });

    goog.object.extend(Child, {
        loadIframeDeferred: function(url, parentElement){
            //TODO: dispose
            var d = new synthjs.utility.Deferred(),
                dWait = new synthjs.utility.Deferred();

            d.addCallbacks(function(){
                var iframe = goog.dom.createDom("iframe");
                goog.style.setStyle(iframe, {
                    display: 'none'
                });
                iframe['src'] = url;
                iframe['onload'] = function(){
                    var win = iframe['contentWindow'];
                    var child = new Child(win);
                    child.createHash();
                    var handler = new goog.events.EventHandler();
                    var listener = function(){
                        handler.dispose();
                        dWait.callback( child );
                    };
                    handler.listen(
                        child,
                        synthjs.process.EventType.SYNC,
                        listener);
                    child.postSyncMessage();
                };

                goog.dom.appendChild(parentElement, iframe);

            }).awaitDeferred(dWait);

            return d;
        },
        loadWindowDeferred: function(url){
            var d = new synthjs.utility.Deferred(),
                dWait = new synthjs.utility.Deferred();

            d.addCallbacks(function(){
                var win = window.open(url);
                var child = new Child(win);
                child.createHash();
                // win.onload = function(){
                win['onload'] = function(){
                    child.postSyncMessage();
                };

                var handler = new goog.events.EventHandler();
                var listener = function(){
                    // clearInterval(timer);
                    handler.dispose();
                    dWait.callback( child );
                };
                handler.listen(
                    child,
                    synthjs.process.EventType.SYNC,
                    listener);

            }).awaitDeferred(dWait);

            return d;

        }
    });

});

