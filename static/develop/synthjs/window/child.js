goog.provide("synthjs.window.Child");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.utility.Deferred");
goog.require("synthjs.window.MessageType");


goog.scope(function(){


var Child = synthjs.window.Child = function(win){
    goog.base(this);
    this._window = win;

};
goog.inherits(Child, synthjs.utility.EventTarget);

goog.object.extend(Child.prototype, {
    disposeInternal: function(){
        goog.base(this, 'disposeInternal');
        this._window.close();
    },
    post: function(){

    }
});

goog.object.extend(Child, {
    messageTarget: null,
    initialize: function(){
        var target = this.messageTarget = new goog.events.EventTarget();
        window.addEventListener("message", function(e){
            target.dispatchEvent(new goog.events.Event(
                synthjs.window.EventType.INTERNAL_MESSAGE,
                e.data));
        });
    },
    postInternal: function(){

    },
    loadDeferred: function(url){
        var d = new synthjs.utility.Deferred(),
            dWait = new synthjs.utility.Deferred();

        d.addCallbacks(function(){
            var win = window.open(url);
            var timer = setInterval(function(){
                win.postMessage(synthjs.window.MessageType.SYNC, document.location.origin);
            }, 100);


            window.addEventListener("message", function(e){
                if( e.data==synthjs.window.MessageType.LOADCHILD ){
                    clearInterval(timer);
                    dWait.callback( new Child(win) );
                }
            });
        }).awaitDeferred(dWait);

        return d;

    }
});

});

