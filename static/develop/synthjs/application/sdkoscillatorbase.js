goog.provide("synthjs.application.SDKOscillatorBase");

goog.require("synthjs.application.OscillatorPlayer");

goog.require("synthjs.model.Collection");
goog.require("synthjs.model.FileSystem");
goog.require("synthjs.model.TextFile");



/**
 * @constructor
 * @extends {synthjs.application.OscillatorPlayer}
 */
synthjs.application.SDKOscillatorBase = function(id, params){
	
	this._fileSystem = new synthjs.model.FileSystem();

	this._oscillatorName = params && params['name'];
	
	goog.base(this, id, params);
	
	this._api = params && params['api'];
	if( !this._api ){
		throw new Error("api is null");
	}
	this._apiUri = new goog.Uri(this._api);
	
	var infoapi = params && params['infoapi'];
	if( !infoapi ){
		throw new Error("infoapi is null"); 
	}
	
	/**
	 * @type {goog.Uri}
	 */
	this._infoapiUri = new goog.Uri(infoapi);
	

	// var ajaxLoader = new synthjs.ui.AjaxLoader();
	// ajaxLoader.setVisible(true);
	
	var self = this;
	//new synthjs.utility.AjaxDeferred(this._infoapiUri.toString(), {
	new synthjs.utility.AjaxDeferred(this.getApi().getFileList().toString(), {
		success: function(e){
			var rt = e.getResponseJson(); // TODO: not json format

			var d = new synthjs.utility.Deferred();
			goog.array.forEach(rt, function(path){
				d.assocChainDeferred(this.addFileDeferred(path));
			}, this);
			
			d.addCallback(function(){
				//this.init();
				// ajaxLoader.dispose();
			}, this).callback();
		}
	}, this).callback();
}

goog.inherits(synthjs.application.SDKOscillatorBase, synthjs.application.OscillatorPlayer);

/**
 * @protected
 */
synthjs.application.SDKOscillatorBase.prototype._init = function(){
	//this.launchOscillator();
}

synthjs.application.SDKOscillatorBase.prototype._getDirectoryControl = goog.abstractMethod;

/**
 * @override
 */
synthjs.application.SDKOscillatorBase.prototype._getBodyComponent = function(){
	
	if( !this._directory ){
		this._directory = this._getDirectoryControl();
		
	}
	
	if( !this._bodyComponent ){
		this._bodyComponent = new synthjs.ui.SplitPane(
			this._directory, 
			this._getWindowHolderComponent(), 
			goog.ui.SplitPane.Orientation.HORIZONTAL);
		this._bodyComponent.setInitialSize(170);
		this._bodyComponent.setHandleSize(5);
		
		this.getHandler().listen(
			this._bodyComponent,
			goog.ui.Component.EventType.CHANGE,
			function(){this._bodyComponent.onResize();}
		)
		
	}
	
	return this._bodyComponent;
}

/**
 * @override 
 */
synthjs.application.SDKOscillatorBase.prototype._attachEvents = function(){
	goog.base(this, "_attachEvents");
	
	this.getHandler()
		// Create window of selected nodefile.
		.listen(
			this._directory, 
			synthjs.ui.DirectoryControl.EventType.ACTIVE,
			this.onDirectoryNodeSelect);
}


/**
 *  
 */
// synthjs.application.SDKOscillatorBase.prototype.onDebugRun = function(){
	// this.closeOscillator();
	// this.postAllDeferred()
		// .addCallback(goog.bind(this.launchOscillator, this))
		// .callback();
// 
// }


/**
 * Add file to local virtual filesystem from server
 * @param {string} url
 */
synthjs.application.SDKOscillatorBase.prototype.addFileDeferred = function(path){
	var resType = synthjs.net.XhrIo.guessFileType(path);
	
	//return new synthjs.utility.AjaxDeferred(this._apiUri.toString()+path, {
	return new synthjs.utility.AjaxDeferred(this.getApi().getFile(path).toString(), {
		responseType: resType,
		success: function(e){
			var rt = e.getResponseText();
			var mimeType = e.getResponseHeader(goog.net.XhrIo.CONTENT_TYPE_HEADER);
			var paths = path.split('/');
			var filename = paths.pop();
			
			switch( resType ){
				case goog.net.XhrIo.ResponseType.BLOB:
					if( mimeType.match("image.*") ){
						var file = new synthjs.model.ImageFile(filename, e.getResponse());//bb.getBlob(mimeType));
					}
					else {
						goog.asserts.assert(false, "Mimetype '%s' file is not supported. Path: '%s', GuessMimetype: '%s'.", mimeType, path, resType);
					}
					
					break;
				default:
					var file = new synthjs.model.TextFile(filename, rt);
					break;
			}
			
			
			// create DIRECTORY recursive
			var parent = this._fileSystem.getRootDirectory(), directory;
			while( paths.length ){
				var directoryName = paths.shift();
				directory = new synthjs.model.Directory(directoryName);
				
				if( this._fileSystem.isDuplicate(directory, parent) ){
					parent = goog.array.find( 
						this._fileSystem.getChildren(parent),
						function(child){
							return child.get("filename")==directoryName;
						});
					goog.asserts.assert(!!parent);
				}
				else {
					this._fileSystem.add(directory, parent);
					parent = directory;
				}
			}
			
			this._fileSystem.add(file, parent);
			//this.addFile(file);
		}
	}, this);
}


/**
 * 
 */
synthjs.application.SDKOscillatorBase.prototype.onDirectoryNodeSelect = function(e){
	switch(e.target.get("type")){
		case synthjs.model.FileType.TEXT:
			this._windowHolder.addWindow( new synthjs.ui.window.Code(e.target) );
			break;
		case synthjs.model.FileType.IMAGE:
			this._windowHolder.addWindow( new synthjs.ui.window.Image(e.target) );
			break;
		
	}
}

