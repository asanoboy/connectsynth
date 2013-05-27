var basepath = "../../closurelibrary/closure/goog/base.js",
    depspath = "../../deps.js",
    bootstrappath = "../../closurelibrary/closure/goog/bootstrap/webworkers.js",
    CLOSURE_BASE_PATH = "../../closurelibrary/closure/goog/";

importScripts(bootstrappath);
importScripts(basepath);
importScripts(depspath);
goog.require("synthjs.process.Parent");
goog.require("goog.events.EventHandler");

importScripts("parent_test_child.js");