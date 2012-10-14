goog.provide("synthjs.Template");
goog.require("goog.net.XhrIo");
goog.require("synthjs.utility.Deferred");

synthjs.Template = {};

synthjs.Template.loadedTemplates = {};

synthjs.Template.loadDeferred = function(src, opt_data, opt_settings){
	opt_data = typeof opt_data != "object" ? {} : opt_data;
	opt_settings = typeof opt_settings != "object" ? {} : opt_settings;
	
	var dWait = new synthjs.utility.Deferred();
	
	return new synthjs.utility.Deferred().addCallback(function(){
		if( synthjs.Template.loadedTemplates[src] ){
			setTimeout(function(){
				dWait.callback(_['template'](synthjs.Template.loadedTemplates[src], opt_data, opt_settings));
			}, 0);
		}
		else {
			goog.net.XhrIo.send(src, function(e){
				synthjs.Template.loadedTemplates[src] = e.target.getResponseText();
				dWait.callback(_['template'](e.target.getResponseText(), opt_data, opt_settings));
			});
		}
	}).awaitDeferred(dWait);
}

