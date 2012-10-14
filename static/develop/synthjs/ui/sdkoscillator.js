goog.provide("synthjs.ui.SDKOscillator");

goog.require("goog.ui.Component");
goog.require("synthjs.ui.SplitPane");
goog.require('goog.style');
goog.require("goog.ui.SplitPane.Orientation");
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventType");
goog.require("goog.object");
goog.require("goog.math.Size");
goog.require("goog.dom.ViewportSizeMonitor");
/**
 * @constructor
 * @extends {goog.ui.Component}
 */
synthjs.ui.SDKOscillator = function(menu, tree, windowHolder, opt_domHelper){
	this._vsm = new goog.dom.ViewportSizeMonitor();
	this._menu = menu;
	this._tree = tree;
	this._windowHolder = windowHolder;
	this._eventHandler = new goog.events.EventHandler();
	
	goog.base(this, opt_domHelper);
}

goog.inherits(synthjs.ui.SDKOscillator, goog.ui.Component);

synthjs.ui.SDKOscillator.prototype.createDom = function(){
	var dom = this.getDomHelper();
	
	var menuContainer = dom.createDom("div", 
		synthjs.ui.SDKOscillator.MENU_CONTAINER_CLASS_NAME_);
	var workspaceContainer = dom.createDom("div",
		synthjs.ui.SDKOscillator.WORKSPACE_CONTAINER_CLASS_NAME_);
	var splitPane = new synthjs.ui.SplitPane(
		this._tree, 
		this._windowHolder, 
		goog.ui.SplitPane.Orientation.HORIZONTAL);
	splitPane.setInitialSize(170);
	splitPane.setHandleSize(5);
	
	this.setElementInternal(dom.createDom('div', synthjs.ui.SDKOscillator.CLASS_NAME_,
		menuContainer, workspaceContainer
	));
	
	this._menuContainer = menuContainer;
	this._workspaceContainer = workspaceContainer;
	this._splitPane = splitPane;
	this._finishSetup();
};

synthjs.ui.SDKOscillator.prototype._finishSetup = function(){
	var dom = this.getDomHelper();
	
	if( !this._menu.getElement() ){
		this._menu.createDom();
	}
	dom.appendChild(this._menuContainer, 
		this._menu.getElement());
	
		
	if( !this._splitPane.getElement() ){
		this._splitPane.createDom();
	}
	dom.appendChild(this._workspaceContainer, 
		this._splitPane.getElement());
	
	
}

synthjs.ui.SDKOscillator.prototype.onResize = function(){
	var size = this._vsm.getSize();
	goog.style.setStyle(this._splitPane.getElement(), {
		height: (size.height-goog.style.getBounds(this._splitPane.getElement()).top)+"px",
		width: (size.width)+"px"
	});
	
	var elSize = goog.style.getBorderBoxSize(this._workspaceContainer);
	this._splitPane.setSize(new goog.math.Size(elSize.width, elSize.height));
	
	this.onResizeChildren();
}

synthjs.ui.SDKOscillator.prototype.onResizeChildren = function(){
	this._windowHolder.onResize();
}

synthjs.ui.SDKOscillator.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	this._menu.enterDocument();
	this._splitPane.enterDocument();

	goog.dom.classes.add( this._tree.getElement(), synthjs.ui.SDKOscillator.TREE_PAIN_CLASS_NAME_ );
	goog.dom.classes.add( this._windowHolder.getElement(), synthjs.ui.SDKOscillator.WINDOWHOLDER_PAIN_CLASS_NAME_ );
	
	this._initializeSizeInternal();

}

synthjs.ui.SDKOscillator.prototype._initializeSizeInternal = function(){
	this._eventHandler.listen(goog.dom.getWindow(), goog.events.EventType.RESIZE, this.onResize, false, this);
	this._eventHandler.listen(this._splitPane, goog.events.EventType.CHANGE, this.onResizeChildren, false, this);
	
	this.onResize();
}

/**
 * @type {string}
 * @private
 */
synthjs.ui.SDKOscillator.CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator");

/**
 * @type {string}
 * @private
 */
synthjs.ui.SDKOscillator.MENU_CONTAINER_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-menu-container");

/**
 * @type {string}
 * @private
 */
synthjs.ui.SDKOscillator.WORKSPACE_CONTAINER_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-workspace-container"); 

/**
 * @type {string}
 * @private
 */
synthjs.ui.SDKOscillator.TREE_PAIN_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-tree-pane"); 

/**
 * @type {string}
 * @private
 */
synthjs.ui.SDKOscillator.WINDOWHOLDER_PANE_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-windowholder-pane"); 

/**
 * @private
 * @type {goog.ui.Component}
 */
synthjs.ui.SDKOscillator.prototype._menu;

/**
 * @private
 * @type {goog.ui.Component}
 */
synthjs.ui.SDKOscillator.prototype._tree;

/**
 * @private
 * @type {goog.ui.Component}
 */
synthjs.ui.SDKOscillator.prototype._windowHolder;