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
var QueryHandler = function(){
    goog.base(this);
};
goog.inherits(QueryHandler, synthjs.process.QueryHandler);
goog.object.extend(QueryHandler.prototype, {
    queryDeferredEach: function(obj){
        return new synthjs.utility.Deferred()
        .addCallback(function(){
            return obj;
        });
    },

    reduceDeferred: function(list){
        return new synthjs.utility.Deferred()
        .addCallback(function(){
            var result = [];
            goog.array.forEach(list, function(e){
                if( e.action=='add' ){
                    result.push(e.value);
                }
            });
            return result;
        });
    }
});

var dispatcher = new synthjs.process.Dispatcher(new QueryHandler());
