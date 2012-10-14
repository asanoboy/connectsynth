goog.provide("synthjs.ui.DirectoryNode");
goog.provide("synthjs.ui.DirectoryNodeType");
goog.provide("synthjs.ui.DirectoryNode.EventType");

goog.require("goog.ui.Component.EventType");
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventType");
goog.require("goog.events.BrowserEvent.MouseButton");
goog.require("goog.ui.tree.TreeNode");
goog.require("goog.string");
goog.require("goog.ui.Menu.EventType");
goog.require("goog.ui.MenuItem");
goog.require("goog.ui.PopupMenu");
goog.require("synthjs.model.EventType");
goog.require("goog.ui.Prompt");
goog.require("goog.events.KeyHandler");

/**
 * @constructor
 * @extends {goog.ui.TreeNode}
 * @param {synthjs.model.FileBase} file
 * @param {synthjs.ui.DirectoryNodeType} type
 */
synthjs.ui.DirectoryNode = function(file, type, opt_editable, opt_config, opt_domHelper){
	this._editable = typeof opt_editable=='undefined' ? true : !!opt_editable;
	
	
	goog.base(this, goog.string.htmlEscape(file.get("filename")), opt_config, opt_domHelper);
	this._fileType = type;
	this._file = file;
	
	this._contextMenu = new goog.ui.PopupMenu(opt_domHelper);
	this._contextMenu.setId("popup-file-menu");
}

goog.inherits(synthjs.ui.DirectoryNode, goog.ui.tree.TreeNode);

synthjs.ui.DirectoryNode.prototype.decorateInternal = function(element){
	goog.base(this, "decorateInternal", element);
	console.log("decorate");

}

synthjs.ui.DirectoryNode.prototype.createDom = function(){
	goog.base(this, "createDom");

}

synthjs.ui.DirectoryNode.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	
	/**
	 * @private
	 */
	//this._keyHandler = new goog.events.KeyHandler(this.getElement());
	
	this.getHandler()
		.listen(
			this._file, 
			synthjs.model.EventType.CHANGE,
			this._onFileChange)
		// .listen(
			// this._keyHandler, 
			// goog.events.KeyHandler.EventType.KEY, 
			// this._onKeyHandler)
		;
	
	if( this._editable ){
		if( this._fileType == synthjs.ui.DirectoryNodeType.DIRECTORY ){
			this._attachDirectoryEvent();
		}
		else {
			this._attachFileEvent();
		}		
	}
	
}

/**
 * @private
 */
synthjs.ui.DirectoryNode.prototype._attachFileEvent = function(){
	
	goog.asserts.assert(this._editable, "This is set non-editable.");
	
	var data = [
		['rename', 'Rename'],
		['delete', 'Delete'],
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
		goog.positioning.Corner.BOTTOM_LEFT,
        goog.positioning.Corner.TOP_LEFT,
        true
	);
	
	this.getHandler().listen(
		this._contextMenu,
		goog.ui.Component.EventType.ACTION,
		this._onContextMenuClick
	);
}

/**
 * @private
 */
synthjs.ui.DirectoryNode.prototype._attachDirectoryEvent = function(){
	
	goog.asserts.assert(this._editable, "This is set non-editable.");
	
	var data = [
		['new-file', 'New File'],
		['new-directory', 'New Directory'],
		['rename', 'Rename'],
		['delete', 'Delete'],
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
		goog.positioning.Corner.BOTTOM_LEFT,
        goog.positioning.Corner.TOP_LEFT,
        true
	);
	
	this.getHandler().listen(
		this._contextMenu,
		goog.ui.Component.EventType.ACTION,
		this._onContextMenuClick
	);
	
	// attach drag&drop event
	this._dropHandler = new goog.events.FileDropHandler(this.getElement(), true);;
	
	this.getHandler()
		.listen(
			this._dropHandler,
			goog.events.FileDropHandler.EventType.DROP,
			this._onDropFile
		)
}
// 
// synthjs.ui.DirectoryNode.prototype._onKeyHandler = function(e){
	// console.log(e);
// }

/**
 * @private
 */
synthjs.ui.DirectoryNode.prototype._onFileChange = function(e){
	switch(e.target.attr){
		case "filename":
			this.setHtml(e.target.after);
			break;
	}
};

synthjs.ui.DirectoryNode.prototype.disposeInternal = function(){
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

synthjs.ui.DirectoryNode.prototype._onContextMenuClick = function(e){
	switch( e.target.getId() ){
		case "delete":
			this.dispatchDeleteEvent();
			break;
		case "rename":
			this.showRenamePrompt();
			break;
	}
}

/**
 * 
 */
synthjs.ui.DirectoryNode.prototype.dispatchDeleteEvent = function(){
	var event = new goog.events.Event(
		synthjs.ui.DirectoryNode.EventType.DELETE,
		this._file);
	this.dispatchEvent(event);
}

/**
 * Show rename prompt.
 */
synthjs.ui.DirectoryNode.prototype.showRenamePrompt = function(){
	var prompt = new goog.ui.Prompt("Rename Resource", "New Name:", goog.bind(function(response){
		if( response == null ){
			
		}
		else{
			this._file.set("filename", response);
		}
	}, this));
	
	prompt.setDefaultValue(this._file.get("filename"));
	prompt.setVisible(true);
}

synthjs.ui.DirectoryNode.prototype._onDropFile = function(e){
	e.stopPropagation();
	this.dispatchEvent(new goog.events.Event(
		synthjs.ui.DirectoryNode.EventType.DROPFILE,
		{
			files: e.getBrowserEvent().dataTransfer.files,
			parent: this._file
		}));
}

synthjs.ui.DirectoryNode.prototype.getCalculatedIconClass = function(){
	if( this._fileType == synthjs.ui.DirectoryNodeType.DIRECTORY && !this.hasChildren() ){
		var config = this.getConfig();
		return config.cssTreeIcon + ' ' + config.cssCollapsedFolderIcon;
	}
	else {
		return goog.base(this, 'getCalculatedIconClass');
	}
}

synthjs.ui.DirectoryNode.prototype.getFileType = function(){
	return this._fileType;
}

/**
 * @override
 */
synthjs.ui.DirectoryNode.prototype.onDoubleClick_ = function(e){
	goog.base(this, "onDoubleClick_", e);
	this.dispatchDblclickEvent();
}

/**
 * 
 */
synthjs.ui.DirectoryNode.prototype.dispatchDblclickEvent = function(){
	var event = new goog.events.Event(synthjs.ui.DirectoryNode.EventType.DBLCLICK);
	this.dispatchEvent(event);
}

/**
 * @override
 */
synthjs.ui.DirectoryNode.prototype.onMouseDown = function(e){
	goog.base(this, "onMouseDown", e);
	switch(e.button){
		case goog.events.BrowserEvent.MouseButton.RIGHT:
			e.stopPropagation();
			e.preventDefault();
			this.dispatchEvent(synthjs.ui.DirectoryNode.EventType.RIGHTMOUSEDOWN);
			break;
			
	}
}

synthjs.ui.DirectoryNodeType = {
	DIRECTORY: "nodetype-directroy",
	FILE: "nodetype-file"
};

synthjs.ui.DirectoryNode.EventType = {
	DBLCLICK: "directory-node-dblclick",
	RIGHTMOUSEDOWN: "directory-node-rightmousedown",
	DROPFILE: "directory-node-dropfile",
	DELETE: "directory-node-delete"
};
