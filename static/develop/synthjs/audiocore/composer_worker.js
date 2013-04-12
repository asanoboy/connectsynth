var basepath = "../../closurelibrary/closure/goog/base.js",
    depspath = "../../deps.js",
    bootstrappath = "../../closurelibrary/closure/goog/bootstrap/webworkers.js",
    CLOSURE_BASE_PATH = "../../closurelibrary/closure/goog/";
    
importScripts(bootstrappath);
importScripts(basepath);
importScripts(depspath);

goog.require("synthjs.audiocore.ComposerWorkerReceiver");

var receiver = new synthjs.audiocore.ComposerWorkerReceiver();
