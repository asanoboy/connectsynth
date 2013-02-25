goog.provide("synthjs.application.api.Plugin");

goog.require("goog.Uri");
goog.require("synthjs.utility.AjaxDeferred");

goog.scope(function(){
	/**
	 * @constructor
	 * @param {string} pluginCode
	 */
	var Plugin = synthjs.application.api.Plugin = function(pluginCode){
		this._pluginCode = pluginCode;
		this._baseUri = new goog.Uri("/app/");
	};

	goog.object.extend(Plugin.prototype, {
		getEnbedUri: function(){
			return this._baseUri.resolve(new goog.Uri("instrument/"+this._pluginCode+"/embed/"));
		},
		publishDeferred: function(name, description, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred();
			var Ctor = this._getCtor(opt_ajaxCtor);
			var rt =  new Ctor(
				"workspace/publish/"+this._pluginCode+"/",
				{
					data: {'name': name, 'description':description},
					method: 'post',
					responseType: goog.net.XhrIo.ResponseType.TEXT,
					success: function(r){
						var rt = r.getResponseJson();
						if( rt['status']=='ok' && rt['next'] ){
							dWait.callback(this.createOk(rt['next']));
						}
						else{
							dWait.callback(this.createError(rt));
						}
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
			return rt;
		},
		_getCtor: function(opt_ajaxCtor){
			return opt_ajaxCtor || synthjs.utility.AjaxDeferred;
		},
		createOk: function(opt_data){
			return {
				status: Plugin.StatusType.OK,
				data: opt_data ? opt_data : null
			};
		},
		createError: function(opt_data){
			return {
				status: Plugin.StatusType.ERROR,
				data: opt_data ? opt_data : null
			};
		}
	});

	// synthjs.application.api.Plugin.prototype.embedUri = function(path){
	// 	return this._baseUri.resolve(new goog.Uri("instrument/"+this._pluginCode+"/embed/"));
	// }

	Plugin.StatusType = {
		OK: 'status-ok',
		ERROR: 'status-err'
	}

	synthjs.application.api.Plugin.prototype.copyPlugin = function(){
		return this._baseUri.resolve(new goog.Uri("workspace/extend_instrument/"+this._pluginCode+"/"));
	}
	synthjs.application.api.Plugin.prototype.publishPlugin = function(){
		return this._baseUri.resolve(new goog.Uri("workspace/publish/"+this._pluginCode+"/"));
	}
	synthjs.application.api.Plugin.prototype.deletePlugin = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/delete/"+this._pluginCode+"/"));
	}
	synthjs.application.api.Plugin.prototype.updateDescription = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/description/"+this._pluginCode+"/"));
	}


	/**
	 * @param {string} name
	 * @return {goog.Uri}
	 */
	synthjs.application.api.Plugin.prototype.getFile = function(path){
		return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"+path));
	}
	synthjs.application.api.Plugin.prototype.getFileList = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/filelist/"+this._pluginCode+"/"));	
	}
	synthjs.application.api.Plugin.prototype.postFile = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"));
	}
	synthjs.application.api.Plugin.prototype.deleteFile = function(){
		return this.postFile();
	}
	synthjs.application.api.Plugin.prototype.getDescription = function(){
		return this.updateDescription();
	}
	synthjs.application.api.Plugin.prototype.getInformation = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/information/"+this._pluginCode+"/"));
	}


	synthjs.application.api.Plugin.prototype.postPreset = function(){
		return this._baseUri.resolve(new goog.Uri("preset/post/"+this._pluginCode+"/"));
	}
	synthjs.application.api.Plugin.prototype.deletePreset = function(){
		return this._baseUri.resolve(new goog.Uri("preset/delete/"+this._pluginCode+"/"));
	}
	synthjs.application.api.Plugin.prototype.getPresetList = function(){
		return this._baseUri.resolve(new goog.Uri("preset/list/"+this._pluginCode+"/"));
	}


});