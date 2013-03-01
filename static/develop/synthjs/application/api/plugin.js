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
		getBootstrapPath: function(){
			return this.getFilePath("bootstrap.js?bootstrap=1");
		},
		getFilePath: function(path){
			return "plugin/"+this._pluginCode+"/"+path;
		},
		getFileDeferred: function(path, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred();
			var Ctor = this._getCtor(opt_ajaxCtor), resType;
			var rt =  new Ctor(
				this.getFilePath(path),
				{
					responseType: (resType = synthjs.net.XhrIo.guessFileType(path)),
					success: function(r){
						var mimeType = r.getResponseHeader(goog.net.XhrIo.CONTENT_TYPE_HEADER);
						switch(resType){
							case goog.net.XhrIo.ResponseType.BLOB:
								if( mimeType.match("image.*") ){
									dWait.callback(this.createOk(r.getResponse()));
								}
								else {
									dWait.callback(this.createError(r));
									goog.asserts.assert(false, "Mimetype '%s' file is not supported. Path: '%s', GuessMimetype: '%s'.", mimeType, path, resType);
								}
								break;
							case goog.net.XhrIo.ResponseType.TEXT:
								dWait.callback( this.createOk(r.getResponseText()) );
								break;
							default:
								dWait.callback(this.createError(r));
								goog.asserts.assert(false, "Responsetype '%s' file is not supported. Path: '%s', GuessMimetype: '%s'.", resType, path, resType);
								break;
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
		getPathListDeferred: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred();
			var Ctor = this._getCtor(opt_ajaxCtor);
			var rt = new Ctor(
				"plugin/filelist/"+this._pluginCode+"/",
				{
					success: function(r){
						var rt = r.getResponseJson();
						dWait.callback( this.createOk(rt) );
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
			return rt;
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
		deleteDeferred: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);
			return new Ctor(
				"plugin/delete/"+this._pluginCode+"/",
				{
					method: 'delete',
					responseType: goog.net.XhrIo.ResponseType.TEXT,
					success: function(r){
						var rt = r.getResponseJson();
						if( rt['status'] === 'ok' ){
							dWait.callback(this.createOk());
						}
						else {
							dWait.callback(this.createError(rt));
						}
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
		},
		saveDeferred: function(files, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor),
				fd = new FormData();
			goog.object.forEach(files, function(blob, name){
				fd.append(name, blob, name);
			});
			return new Ctor(
				"plugin/"+this._pluginCode+"/",
				{
					data: fd,
					method: 'post',
					success: function(r){
						var rt = r.getResponseText();
						if( rt==='ok' ){
							dWait.callback(this.createOk());
						}
						else {
							dWait.callback(this.createError(r));
						}
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
		},
		getDescription: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);
			return new Ctor(
				"plugin/description/"+this._pluginCode+"/",
				{
					success: function(r){
						var rt = r.getResponseJson();
						if( rt['status'] === 'ok' && rt['description'] ){
							dWait.callback(this.createOk(rt['description']));
						}
						else {
							dWait.callback(this.createError(r));
						}
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
		},
		updateDescriptionDeferred: function(description, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);
			return new Ctor(
				"plugin/description/"+this._pluginCode+"/",
				{
					method: 'post',
					success: function(r){
						var rt = r.getResponseJson();
						if( rt['status'] === 'ok' ){
							dWait.callback(this.createOk());
						}
						else {
							dWait.callback(this.createError(r));
						}
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
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

	// Made publishDeferred
	synthjs.application.api.Plugin.prototype.publishPlugin = function(){
		return this._baseUri.resolve(new goog.Uri("workspace/publish/"+this._pluginCode+"/"));
	}

	// Made deleteDeferred
	synthjs.application.api.Plugin.prototype.deletePlugin = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/delete/"+this._pluginCode+"/"));
	}

	// Made updateDesciptionDeferred
	synthjs.application.api.Plugin.prototype.updateDescription = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/description/"+this._pluginCode+"/"));
	}


	/**
	 * Made getFileDeferred
	 * @param {string} name
	 * @return {goog.Uri}
	 */
	synthjs.application.api.Plugin.prototype.getFile = function(path){
		return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"+path));
	}

	// Made getPathListDeferred
	synthjs.application.api.Plugin.prototype.getFileList = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/filelist/"+this._pluginCode+"/"));	
	}

	// Made saveDeferred
	synthjs.application.api.Plugin.prototype.postFile = function(){
		return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"));
	}
	// Never be used
	// synthjs.application.api.Plugin.prototype.deleteFile = function(){
	// 	return this.postFile();
	// }


	// Made getDescriptionDeferred
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