var basepath = "../../closurelibrary/closure/goog/base.js",
    depspath = "../../deps.js",
    bootstrappath = "../../closurelibrary/closure/goog/bootstrap/webworkers.js",
    CLOSURE_BASE_PATH = "../../closurelibrary/closure/goog/";

importScripts(bootstrappath);
importScripts(basepath);
importScripts(depspath);

goog.require("synthjs.audiocore.ComposerQueryDispatcher");

var dispatcher = new synthjs.audiocore.ComposerQueryDispatcher();

addEventListener("message", onMessage, false);

function onMessage(e){
    // try{
    dispatcher.queryDeferred(e.data)
        .addCallback(function(r){
            r.callback = e.callback;
            postMessage(r);
        })
        .callback();
    // }
    // catch(e){
    //     for( var k in e){
    //         postMessage(k);
    //         // postMessage("k="+e[k].toString());
    //     }
    // }
}