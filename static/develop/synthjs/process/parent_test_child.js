(function(){
    var Parent = synthjs.process.Parent;
    var handler = new goog.events.EventHandler();

    Parent.loadDeferred().addCallbacks(function(parent){
        var handler = new goog.events.EventHandler();
        handler.listen(  // echo listener
            parent,
            synthjs.process.EventType.MESSAGE,
            function(event){
                parent.postMessage(event.target);
            });
    }).callback();
})();
