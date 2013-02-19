goog.provide("synthjs.window.Parent");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.window.MessageType");


goog.scope(function(){


var Parent = synthjs.window.Parent = function(){
    goog.base(this);
    this._status = Parent.Status.LOADING;

    window.addEventListener("message", goog.bind(this.initListener, this));
};
goog.inherits(Parent, synthjs.utility.EventTarget);
goog.addSingletonGetter(Parent);

goog.object.extend(Parent.prototype, {
    initListener: function(e){
        if( e.data == synthjs.window.MessageType.SYNC ){
            this._parent = e.source;
            this._parent.postMessage(synthjs.window.MessageType.LOADCHILD, document.location.origin);
            window.removeEventListener("message", this.initListener);
            window.addEventListener("message", goog.bind(this.messageListener, this));
        }
    },
    messageListener: function(e){
        if( e.data['type'] && e.data['data'] && e.data['type'] == synthjs.window.MessageType.Message ){
            this.dispatchEvent(new goog.events.Event(synthjs.window.EventType.MESSAGE, e.data['data']));
        }
    },
    post: function(data){
        this._parent.postMessage({
            'type': synthjs.window.MessageType.MESSAGE,
            'data': data
        }, document.location.origin);
    }

});

goog.object.extend(Parent, {
    Status: {
        LOADING: 'loading'
    }
});
});