goog.provide("synthjs.window.MessageManager");

goog.require("synthjs.utility.EventTarget");
goog.require("synthjs.window.Target");

goog.scope(function(){
    var MessageManager = synthjs.window.MessageManager = function(){
        goog.base(this);
        this._targetHash = {};
        window.addEventListener("message", goog.bind(this.listener, this));
    };
    goog.inherits(MessageManager, synthjs.utility.EventTarget);
    goog.getSingletonGetter(MessageManager);

    goog.object.extend(MessageManager.prototype, {
        listener: function(e){

        },
        createTarget: function(){
            var target = new synthjs.window.Target();
            this._targetHash[target.getHash()] = target;
            return target;
        }
    });

});