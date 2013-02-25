goog.provide("synthjs.testing.AjaxDeferred");

goog.require("goog.testing.net.XhrIo");
goog.require("synthjs.utility.AjaxDeferred");


goog.scope(function(){
    var Ajax = synthjs.testing.AjaxDeferred = function(url, settings, opt_context){
        goog.base(this, url, settings, opt_context);
    };
    goog.inherits(Ajax, synthjs.utility.AjaxDeferred);

    goog.object.extend(Ajax.prototype, {
        createXhrIo: function(){
            return this._xhrioMock = new goog.testing.net.XhrIo();
        },
        simulateResponse: function(status, ret, opt_headers){
            this._xhrioMock.simulateResponse(
                status,
                ret,
                opt_headers ? opt_headers : {});
        }
    });
});