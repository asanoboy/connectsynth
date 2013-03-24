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
			return "/app/plugin/"+this._pluginCode+"/"+path;
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
				"/app/plugin/filelist/"+this._pluginCode+"/",
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
				"/app/workspace/publish/"+this._pluginCode+"/",
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
				"/app/plugin/delete/"+this._pluginCode+"/",
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
				"/app/plugin/"+this._pluginCode+"/",
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
		fetchDeferred: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);

			return new Ctor(
				"/app/workspace/extend_instrument/"+this._pluginCode+"/",
				{
					responseType: goog.net.XhrIo.ResponseType.TEXT,
					success: function(r){
						var rt = r.getResponseJson();
						if( rt['status']=='ok' && rt['next'] ){
							dWait.callback(this.createOk({
								next: rt['next']
							}));
						}
						else if( rt['status']=='signout' && rt['next'] ){
							dWait.callback(this.createError({
								next : rt['next'],
								status: 'signout'
							}));
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
		getDescriptionDeferred: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);
			return new Ctor(
				"/app/plugin/description/"+this._pluginCode+"/",
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
				"/app/plugin/description/"+this._pluginCode+"/",
				{
					data: {'description': description},
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
		postPresetDeferred: function(name, value, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);

			return new Ctor(
				"/app/preset/post/"+this._pluginCode+"/",
				{
					data: {"name":name, "value":value},
					method: "POST",
					success: function(r){
						var rt = r.getResponseJson();
						if( rt['status'] == 'ok' ){
							dWait.callback(this.createOk(rt['code']));
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
		getPresetsDeferred: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);

			return new Ctor(
				"/app/preset/list/"+this._pluginCode+"/",
				{
					method: "GET",
					success: function(r){
						var rt = r.getResponseJson();
						if( goog.isArray(rt) ){
							var isValid = true;
							goog.array.forEach(rt, function(e){
								if( goog.isDef(e['name']) &&
									goog.isDef(e['value']) &&
									goog.isDef(e['code']) )
								{}
								else {
									isValid = false;
								}
							});

							if( isValid ){
								dWait.callback(this.createOk(rt));
								return;
							}
						}
						dWait.callback(this.createError(rt));
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}

				},
				this
			).awaitDeferred(dWait);
		},
		deletePresetDeferred: function(code, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);

			return new Ctor(
				"/app/preset/delete/"+this._pluginCode+"/",
				{
					data: {"preset_code": code},
					method: "POST",
					success: function(r){
						var rs = r.getResponse();
						if( rs == "ok" ){
							dWait.callback(this.createOk());
						}
						else {
							dWait.callback(this.createError(rs));
						}
					},
					error: function(rt){
						dWait.callback(this.createError(rt));
					}
				},
				this
			).awaitDeferred(dWait);
		},
		getPublicInformationDeferred: function(opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);

			return new Ctor(
				"/app/plugin/information/"+this._pluginCode+"/",
				{
					method: "GET",
					success: function(r){
						var rt = r.getResponseJson();
						if( goog.isDef(rt['description']) &&
							goog.isDef(rt['screen_name'])
						)
						{
							dWait.callback(this.createOk(rt));
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
		/**
		 * [postPluginFiles description]
		 * @param  {synthjs.model.FileSystem]} fileSystem [description]
		 */
		postPluginFilesDeferred: function(fileSystem, opt_ajaxCtor){
			var dWait = new synthjs.utility.Deferred(),
				Ctor = this._getCtor(opt_ajaxCtor);

			var pluginPoster = new synthjs.net.PluginPoster(
				"/app/plugin/"+this._pluginCode+"/");
			goog.array.forEach(fileSystem.getAllFiles(), function(file){
				switch(file.get("type")){
					case synthjs.model.FileType.TEXT:
						var bb = new synthjs.utility.BlobBuilder();
						bb.append(file.get('content'));
						pluginPoster.addFile(fileSystem.getPath(file).join("/"), bb.getBlob("text/plain"));
						break;
					case synthjs.model.FileType.IMAGE:
						pluginPoster.addFile(fileSystem.getPath(file).join("/"), file.get("content"));
						break;
				}
			}, this);
			return pluginPoster.getRequestDeferred();
		},
		_getCtor: function(opt_ajaxCtor){
			return opt_ajaxCtor || synthjs.utility.AjaxDeferred;
		},
		createOk: function(opt_data){
			return {
				isSuccess: function(){return true;},
				data: opt_data ? opt_data : null
			};
		},
		createError: function(opt_data){
			return {
				isSuccess: function(){return false;},
				data: opt_data ? opt_data : null
			};
		}
	});

	// synthjs.application.api.Plugin.prototype.copyPlugin = function(){
	// 	return this._baseUri.resolve(new goog.Uri("workspace/extend_instrument/"+this._pluginCode+"/"));
	// }
	/**
	 * Made getFileDeferred
	 * @param {string} name
	 * @return {goog.Uri}
	 */
	synthjs.application.api.Plugin.prototype.getFile = function(path){
		return this._baseUri.resolve(new goog.Uri("plugin/"+this._pluginCode+"/"+path));
	}


});