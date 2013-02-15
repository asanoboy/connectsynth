goog.provide("synthjs.window.Child");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.utility.Deferred");
goog.require("synthjs.window.Parent");


goog.scope(function(){

var Parent = synthjs.window.Parent;

var Child = synthjs.window.Child = function(win){
    goog.base(this);
    this._window = win;

};
goog.inherits(Child, synthjs.utility.EventTarget);

goog.object.extend(Child.prototype, {

});

goog.object.extend(Child, {
    loadDeferred: function(url){
        var d = synthjs.utility.Deferred(),
            dWait = synthjs.utility.Deferred();

        d.addCallback(function(){
            var win = window.open(url);
            win.addEventListener("message", function(e){
                if( e.data==Child.EventType.ONLOAD ){
                    dWait.callback( new Child(win) );
                }
            });
        }).awaitDeferred(dWait);

        return d;

    },
    EventType:  {
        ONLOAD: 'child-window-loaded'
    }
});

});

