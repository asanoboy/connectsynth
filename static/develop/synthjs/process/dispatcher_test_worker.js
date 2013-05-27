var basepath = "../../closurelibrary/closure/goog/base.js",
    depspath = "../../deps.js",
    bootstrappath = "../../closurelibrary/closure/goog/bootstrap/webworkers.js",
    CLOSURE_BASE_PATH = "../../closurelibrary/closure/goog/";

importScripts(bootstrappath);
importScripts(basepath);
importScripts(depspath);

goog.require("synthjs.process.Dispatcher");
goog.require("synthjs.process.Query");

/**
 * @constructor
 */
var Dispatcher = function(Handler){
    goog.base(this, Handler);
};
goog.inherits(Dispatcher, synthjs.process.Dispatcher);
goog.object.extend(Dispatcher.prototype, {
    queryDeferred: function(){
        setTimeout(function(){
            postMessage("FFF");
        }, 1000);
    }
});

/**
 * @constructor
 */
var QueryHandler = function(){
    goog.base(this);
};
goog.inherits(QueryHandler, synthjs.process.QueryHandler);
goog.object.extend(QueryHandler.prototype, {

});

var dispatcher = new Dispatcher(QueryHandler);
