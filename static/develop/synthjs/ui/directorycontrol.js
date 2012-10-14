goog.provide("synthjs.ui.DirectoryControl");
goog.provide("synthjs.ui.DirectoryControl.EventType");

goog.require("goog.asserts");
goog.require("goog.ui.tree.TreeControl");
goog.require("goog.object");


goog.require("synthjs.ui.DirectoryNodeType");
goog.require("synthjs.model.ImageFile");
goog.require("synthjs.model.FileBase");
goog.require("goog.ui.PopupMenu");
goog.require("goog.ui.Component.EventType");
goog.require("goog.ui.MenuItem");
goog.require("goog.events.FileDropHandler");
goog.require("goog.events.FileDropHandler.EventType");
goog.require("goog.fs.FileReader");
goog.require("goog.fs.FileReader.EventType");

/**
 * @constructor
 * @extends {goog.ui.TreeControl}
 * @param {synthjs.model.FileSystem}
 */
synthjs.ui.DirectoryControl = function(fileSystem, opt_editable, opt_folderOnly, opt_domHelper){
	this._editable = typeof opt_editable=='undefined' ? true : !!opt_editable;
	this._fileSystem = fileSystem;
	this.folderOnly_ = opt_folderOnly;
	this._contextMenu = new goog.ui.PopupMenu(opt_domHelper);
	this._contextMenu.setId("directory-controll-menu");
	
	/**
	 * @private
	 * 
	 */
	this._fileToNode = [[
		this._fileSystem.getRootDirectory(),
		this
	]];
	
	var config = goog.object.clone(goog.ui.tree.TreeControl.defaultConfig);
	config.cleardotPath = '/static/develop/closure/goog/images/tree/cleardot.gif'; //TODO:
	goog.base(this, '/', config);//TODO: , opt_domHelper);
};

goog.inherits(synthjs.ui.DirectoryControl, goog.ui.tree.TreeControl);

// TOOD: 
synthjs.ui.DirectoryControl.CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-tree-pane"); 

/**
 * @override
 */
synthjs.ui.DirectoryControl.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	
	goog.dom.classes.add( 
		this.getElement(), 
		synthjs.ui.DirectoryControl.CLASS_NAME_
	);
	
	//this._addDirectoryNodeRecursive(this, this._fileSystem.getRootDirectory());
	goog.array.forEach( this._fileSystem.getChildren( this._fileSystem.getRootDirectory() ), function(child){
		this._addFileNode(this, child);
	}, this );
	
	
	
	this._attachEvents();
}

/**
 * @override
 */
synthjs.ui.DirectoryControl.prototype.handleKeyEvent = function(e){
	var handled = goog.base(this, "handleKeyEvent", e);
	
	if( handled ){
		return true;
	}
	
	if( this._editable ){
		switch(e.keyCode){
			case 113: // F2
				var node = this.getSelectedItem();
				if( node instanceof synthjs.ui.DirectoryNode ){ // Filter except synthjs.ui.DirectoryControl
					node.showRenamePrompt();
					handled = true;
				}
				break;
			case 46: // Delete
				var node = this.getSelectedItem();
				if( node instanceof synthjs.ui.DirectoryNode ){ // Filter except synthjs.ui.DirectoryControl
					node.dispatchDeleteEvent();
					handled = true;
				}
				break;
		}
	}
	
	switch(e.keyCode){
		case 13: // Enter
			var node = this.getSelectedItem();
			if( node instanceof synthjs.ui.DirectoryNode ){ // Filter except synthjs.ui.DirectoryControl
				node.dispatchDblclickEvent();
				handled = true;
			}
			
			break;
	}
	
	
	
	return handled;
}
	

synthjs.ui.DirectoryControl.prototype._attachEvents = function(){
	

	
	
	this.getHandler()
		.listen(
			this._fileSystem,
			synthjs.model.Collection.EventType.ADD,
			this._onAddFile
		)
		.listen(
			this._fileSystem,
			synthjs.model.Collection.EventType.REMOVE,
			this._onRemoveFile
		);
		
	if( this._editable ){
			
		var data = [
			[synthjs.ui.DirectoryControl.PopupMenuId.ADD_DIRECTORY, 'New Directory']
		];
		var dom = this._contextMenu.getDomHelper();
		goog.array.forEach(data, function(entry) {
			var item = new goog.ui.MenuItem(entry[1], null, dom);
			item.setId(entry[0]);
			this._contextMenu.addChild(item, true);
		}, this);
			
		this._contextMenu.render();
		
		this._contextMenu.attach(
			this.getElement(),
			undefined,
	        undefined,
	        true
		);
		
		this._dropHandler = new goog.events.FileDropHandler(this.getElement(), true);
	
		
		this.getHandler()
		
			.listen(
				this._contextMenu,
				goog.ui.Component.EventType.ACTION, 
				this._onPopupActive,
				false, this)
			.listen(
				this._dropHandler,
				goog.events.FileDropHandler.EventType.DROP,
				this._onDropFile
			);
	}
	
}

synthjs.ui.DirectoryControl.prototype.disposeInternal = function(){
	goog.base(this, "disposeInternal");
	if( this._contextMenu ){
		this._contextMenu.dispose();
	}
	if( this._dropHandler ){
		this._dropHandler.dispose();
	}
	this._contextMenu = null;
	this._dropHandler = null;
}

synthjs.ui.DirectoryControl.prototype._onDropFile = function(e){
	
	goog.asserts.assert(this._editale, "Catch change event on filesystem, but this is set non-editable.");
	
	var files = e.getBrowserEvent().dataTransfer.files;
	this._addFileListToSystem(files);
	
}

/**
 * @param {FileList} files
 * @param {synthjs.model.Directory=} opt_parent
 */
synthjs.ui.DirectoryControl.prototype._addFileListToSystem = function(files, opt_parent){
	var parent = opt_parent ? opt_parent : null;
	goog.array.forEach(files, function(file){
		var reader = new goog.fs.FileReader();
		var handler = new goog.events.EventHandler(this);
		var filename = file.name;
		
		if( file.type.match('text.*') || file.type.match('application/x-javascript') ){
			handler.listen(reader,
				goog.fs.FileReader.EventType.LOAD,
				function(e){
					var file = new synthjs.model.TextFile(filename, e.target.getResult());
					this._fileSystem.add(file, parent);
					handler.dispose();
					handler = null;
				});
			reader.readAsText(file);
		}
		else if( file.type.match('image.*') ){
			this._fileSystem.add(
				new synthjs.model.ImageFile(filename, file),
				parent
			);
		}
		else {
			throw new Error("invalid file type '"+file.type+"'");
		}

	}, this);
}

/**
 * Listener to file add event to this._fileSystem.
 * This calls _addFileNode function to add file node to the directory tree.
 * @param {goog.events.Event} e
 */
synthjs.ui.DirectoryControl.prototype._onAddFile = function(e){
	
	var file = e.target;
	var parent = this._fileSystem.getParent(file);
	
	goog.asserts.assertInstanceof(parent, synthjs.model.FileBase);
	
	var parentFileToNode = goog.array.find(this._fileToNode, function(v){
		return v[0].equals(parent);
	});
	
	goog.asserts.assert(parentFileToNode);
	var parentNode = parentFileToNode[1];
	
	this._addFileNode(parentNode, file);
}

/**
 * Listener to file remove event to this._fileSystem.
 * This is responsible for disposing the removed node and file.
 */
synthjs.ui.DirectoryControl.prototype._onRemoveFile = function(e){
	
	// It's disabled to search parent file by e.target(file), 
	// because the file was removed from this._fileSystem. 
	var file = e.target;
	var removeNode = this.getNodeByFile(file);
	
	var parentNode = removeNode.getParent();
	//removeNode.dispose();
	parentNode.removeChild(removeNode);
	removeNode.dispose();
	this._fileToNode = goog.array.filter(
		this._fileToNode,
		function(m){
			if( m[0].equals(file) ){
				file.dispose();
				return false;
			}
			return true;
		});
}

/**
 * 
 * @param {synthjs.model.FileBase} file
 * @return {goog.ui.tree.BaseNode|boolean} 
 */
synthjs.ui.DirectoryControl.prototype.getNodeByFile = function(file){
	if( file.equals(this._fileSystem.getRootDirectory() )){
		return this;
	}
	
	var nodes = goog.array.map(
		goog.array.filter(this._fileToNode, function(v){
			return v[0].equals(file); 
		}),
		function(v){
			return v[1];
		});
	if( nodes.length==1 ){
		return nodes[0];
	}
	else{
		throw new Error("Invalid input value 'file'.");
		return false;
	}
	
}

// /**
 // * Remove child nodes recursively in the directory tree.
 // * Unless child exists, this does not throw Error.
 // * @param {goog.ui.tree.BaseNode} child
 // */
// synthjs.ui.DirectoryControl.prototype.removeChildRecursive = function(child){
	// var removedNodes = [];
	// var recursiveRemove = function(node){
		// goog.array.forEach(node.getChildren(), function(c){
			// if( c==child ){
				// removedNodes.push(c);
				// node.removeChild(c);
			// }
			// else {
				// recursiveRemove(c);
			// }
		// })
	// }
// 	
	// recursiveRemove(child);
	// console.log(removedNodes);
	// goog.asserts.assert( removedNodes.length == 1 );
// }

/**
 * Input file gets appended to input parentNode recursively.
 * @param {(synthjs.ui.DirectoryControl|synthjs.ui.DirectoryNode)} parentNode This node has already existed.
 * @param {synthjs.model.FileBase} directory This directory is being attached to parentNode.
 */
synthjs.ui.DirectoryControl.prototype._addFileNode = function(parentNode, file){
	
	switch(file.get("type")){
		case synthjs.model.FileType.DIRECTORY:
			var type = synthjs.ui.DirectoryNodeType.DIRECTORY;
			break;
		default:
		
			if( !goog.object.containsValue(synthjs.model.FileType, file.get("type")) ){
				throw new Error("invalid filetype '"+file.get("type")+"'");
			}
			
			var type = synthjs.ui.DirectoryNodeType.FILE;
			break;
		
	}
	var childNode = new synthjs.ui.DirectoryNode(
		file,
		type,
		this._editable,
		this.getConfig(),
		this.getDomHelper()
	);
	
	parentNode.add(childNode);
	this._fileToNode.push([
		file, childNode
	]);
	
	// Listen to delete event from childNode.
	this.getHandler().listen(
		childNode,
		synthjs.ui.DirectoryNode.EventType.DELETE,
		function(e){
			goog.asserts.assertInstanceof(e.target, synthjs.model.FileBase);
			this._fileSystem.remove(e.target, true); // Remove recursively
		}
	)
	
	// If type of the childNode is directory,
	// this attaches event to Drag&Drop event on this childNode. 
	if( file.get("type")==synthjs.model.FileType.DIRECTORY ){
		this.getHandler().listen(
			childNode,
			synthjs.ui.DirectoryNode.EventType.DROPFILE,
			function(e){
				
				// e.target is FileList.
				goog.asserts.assertInstanceof(e.target.files, FileList);
				goog.asserts.assertInstanceof(e.target.parent, synthjs.model.Directory);
				
				this._addFileListToSystem(e.target.files, e.target.parent);
				
			}
		)
	}
	// If the added node is not directory, 
	// this dispatches event to activate the file related to the node. 
	else {
		this.getHandler().listen(
			childNode,
			synthjs.ui.DirectoryNode.EventType.DBLCLICK,
			function(e){
				this.dispatchEvent(
					new goog.events.Event(
						synthjs.ui.DirectoryControl.EventType.ACTIVE,
						file
					)
				)
			}
		);
	}
	
	
	goog.array.forEach( this._fileSystem.getChildren(file), function(child){
		this._addFileNode(childNode, child);
	}, this);
}

synthjs.ui.DirectoryControl.prototype._onPopupActive = function(e){
	switch( e.target.getId() ){
		// Add directory {synthjs.model.Directory} to this._fileSystem under the root directory. 
		case synthjs.ui.DirectoryControl.PopupMenuId.ADD_DIRECTORY:
			this._fileSystem.add(
				new synthjs.model.Directory("new")
			);
			break;
		default :
			goog.asserts.assert(false);
			break;
	}
}

synthjs.ui.DirectoryControl.PopupMenuId = {
	ADD_DIRECTORY: 'add-directory'
} 

synthjs.ui.DirectoryControl.EventType = {
	ACTIVE: 'directorycontrol-actiove'
}
