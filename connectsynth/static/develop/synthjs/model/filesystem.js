goog.provide("synthjs.model.FileSystem");

goog.require("goog.events.EventHandler");
goog.require("synthjs.model.Collection");
goog.require("synthjs.model.FileBase");
goog.require("synthjs.model.Directory");
goog.require("goog.ui.Dialog");

/**
 * @constructor
 * @extends {synthjs.model.Collection}
 */
synthjs.model.FileSystem = function(){
	goog.base(this, synthjs.model.FileBase);

	this._initInternal();
}
goog.inherits(synthjs.model.FileSystem, synthjs.model.Collection);

synthjs.model.FileSystem.prototype._initInternal = function(){
	this._rootDirectory = new synthjs.model.Directory(''); 
	this._addInternal(this._rootDirectory);
}

/**
 * @param {synthjs.model.FileBase} file
 * @param {synthjs.model.FileBase=} opt_parentFile
 */
synthjs.model.FileSystem.prototype.add = function(file, opt_parentFile){
	
	var parentFile = opt_parentFile ? opt_parentFile : this._rootDirectory;
	
	if( !this.has(parentFile) ){
		goog.asserts.assert(false, "Parent file that is not included in filesystem was be added.");
		return;
		//throw new Error("This filesystem cannot include input file");
	}
	
	if( this.isDuplicate(file, parentFile) ){
		var nextName = this._getNextName( file.get("filename") );
		file.set("filename", nextName);
		this.add(file)
		return;
		//throw new Error("This filesystem cannot include input file");
	}
	
	// TODO: Check filename not to include invalid charactor.
	// var needle = 0;
	// var allowedChars = "abcdefghijklmnopqrstuvwxyz";
	// allowedChars += allowedChars.toUpperCase();
	// allowedChars += "_-.1234567890";
	// var filename = file.get('filename');
	// var cnt = 0;
	// while( needle<allowedChars.length ){
// 		
		// needle++;
	// }
	
	this.getHandler().listen(
		file,
		synthjs.model.EventType.CHANGE,
		this._onFileChange
	)
	
	this._addInternal(file, parentFile);

	return true;
}

synthjs.model.FileSystem.prototype._onFileChange = function(e){
	var target = e.target;
	switch( target.attr ){
		
		// Confirm which filename is duplicated or not.
		case "filename":
			var parent = this.getParent(target.model);
			var children = this.getChildren(parent);
			var sameNames = goog.array.filter(children, function(child){
				return child.get("filename")==target.after;
			})
			
			if( sameNames.length>1 ){
				// Can't change filename, because of duplicated filename.
				
				var handler = new goog.events.EventHandler(this); 
				var dialog = new goog.ui.Dialog(null, false);
				dialog.setTitle("Abort");
				dialog.setContent("Can't rename, because of filename duplicated");
				dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
				handler.listen(
					dialog,
					goog.ui.Dialog.EventType.SELECT,
					function(e){
						handler.dispose();
						handler = null;
						target.model.set("filename", target.before);
					}
				)
				dialog.setVisible(true);
			}
			
			break;
	}
}

/**
 *  @return {Array}
 */
synthjs.model.FileSystem.prototype.getAllFiles = function(){
	
	return goog.array.map(
		goog.array.filter(
			this._models,
			function(m){
				return m[0].get("type")==synthjs.model.FileType.TEXT ||
					m[0].get("type")==synthjs.model.FileType.BINARY ||
					m[0].get("type")==synthjs.model.FileType.IMAGE;
			}
		), function(m){
			return m[0];
		}
	);
	
}

/**
 * @return {Array|Boolean}
 */
synthjs.model.FileSystem.prototype.getPath = function(file){
	var info = goog.array.find(this._models, function(m){
		return m[0].equals(file);
	});
	
	// Case that this does not contain input file.
	if( !info ){
		return false;
	}
	
	if( info[1].equals(this._rootDirectory) ){
		return [file.get("filename")];
	}
	
	// Case that input file is RootDirectory or other invalid file.
	if( !info[1] ){
		return false;
	}
	
	var dirpath = this.getPath(info[1]);
	if( !dirpath ){
		return false;
	}
	
	dirpath.push(file.get('filename'));
	return dirpath;
	
}


/**
 * @param {synthjs.model.FileBase} file
 * @param {synthjs.model.FileBase} parent
 */
synthjs.model.FileSystem.prototype.canAdd = function(file, parent){
	if( !this.has(parent) ) {
		console.log("Parent does not exist.");
		return false;
	}
	
	return !this.isDuplicate(file, parent);
}

/**
 * @param {synthjs.model.FileBase} file
 * @param {synthjs.model.FileBase} parent
 */
synthjs.model.FileSystem.prototype.isDuplicate = function(file, parent){
	var sames = goog.array.filter(this.getChildren(parent), function(child){
		return child.get("filename")==file.get("filename");
	}, this);
	
	return sames.length ? true : false;

}

/**
 * If name is 'test.jpg', return 'test_1.jpg'.
 * If name is 'test_1.jpg', return 'test_2.jpg'. 
 * @param {string} name
 */
synthjs.model.FileSystem.prototype._getNextName = function(name){
	
	if( name.indexOf('/')!=-1 ){
		goog.asserts.assert(false, "The 'name' must not include '/' char.")
	}
	
	var mat;
	
	// Confirm name has suffix.
	var suffix = '';
	
	if( mat=name.match(/\.[^/.]+$/) ){
		suffix = mat[0];
		name = name.substring(0, name.lastIndexOf(suffix)); 
	}
	
	if( mat=name.match(/_([\d]+)$/) ){
		name = name.substring(0, name.lastIndexOf(mat[0]));
		name = name+"_"+(parseInt(mat[1])+1);
	}
	else{
		name = name+"_1";
	}
	
	return name+suffix;
}

/**
 * 
 */
synthjs.model.FileSystem.prototype.remove = function(file, opt_recursive){
	
	var children = this.getChildren(file);
	if( children.length>0 ){
		if( opt_recursive ){
			goog.array.forEach(children, function(child){
				this.remove(child, true);
			}, this);
		}
		else {
			throw new Error("This file has some child.");
		}
	}
	return this._removeInternal(file);
	
};

/**
 * @param {synthjs.model.FileBase} child
 * @return {null|synthjs.model.FileBase} If child is Root or not included, return false
 */
synthjs.model.FileSystem.prototype.getParent = function(child){
	var parentInfo = goog.array.find(this._models, function(m){
		return m[0].equals(child);
	});
	
	return parentInfo ? parentInfo[1] : false;
}

/**
 * @param {synthjs.model.FileBase} parent
 * @return {Array}
 */
synthjs.model.FileSystem.prototype.getChildren = function(parent){
	//console.log(this._models);
	var children = goog.array.map(
		goog.array.filter(
			this._models, 
			function(m){
				return m[1] && m[1].equals(parent);
			}
		),
		function(m){
			return m[0];
		}
	);
	
	return children;
}

synthjs.model.FileSystem.prototype.getRootDirectory = function(){
	return this._rootDirectory;
}

/**
 * @param {Array} path
 * @param {synthjs.model.FileBase=} opt_parent
 * @return {boolean|synthjs.mode.FileBase}
 */
synthjs.model.FileSystem.prototype.getFileByPath = function(path, opt_parent){
	var parent = opt_parent ? opt_parent : this._rootDirectory;
	
	var filename = path.shift();
	
	var file = goog.array.find(this.getChildren(parent), function(child){
		return child.get('filename')==filename; 
	});
	
	if( !file ){
		return false;
	}
	if( path.length==0 ){
		return file;
	}
	
	if( file.get("type")==synthjs.model.FileType.DIRECTORY ){
		return this.getFileByPath(path, file);
	}
	else {
		return false;
	}
	
}

synthjs.model.FileSystem.prototype.reset = function(){
		
	// add RootDirectory
	goog.base(this, 'reset');
	this._initInternal();
}