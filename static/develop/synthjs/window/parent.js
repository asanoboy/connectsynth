goog.provide("synthjs.window.Parent");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.window.Child");


goog.scope(function(){

var Child = synthjs.window.Child;

var Parent = synthjs.window.Parent = function(){
    goog.base(this);

    window.postMessage(Child.EventType.ONLOAD);
    
};
goog.inherits(Parent, synthjs.utility.EventTarget);
goog.addSingletonGetter(Parent);

goog.object.extend(Parent.prototype, {
    postAndWaitDeferred: function(){},
    post: function(){
        
    }

});

Parent.EventType = {
    MESSAGE: ""
};
});