goog.provide("synthjs.ui.MenuAndBody");

goog.require("goog.ui.Component");
goog.require("goog.math.Size");
goog.require("goog.dom.ViewportSizeMonitor");

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.ui.Component} menuComponent
 * @param {goog.ui.Component} bodyComponent
 */
synthjs.ui.MenuAndBody = function(menuComponent, bodyComponent, opt_domHelper){
	this._vsm = new goog.dom.ViewportSizeMonitor();
	
	this._menuComponent = menuComponent;
	this._bodyComponent = bodyComponent;
	goog.base(this, opt_domHelper);
}

goog.inherits(synthjs.ui.MenuAndBody, goog.ui.Component);

/**
 * @override
 */
synthjs.ui.MenuAndBody.prototype.createDom = function(){
	var dom = this.getDomHelper();
	
	var menuContainer = dom.createDom("div", 
		synthjs.ui.MenuAndBody.MENU_CONTAINER_CLASS_NAME_);
	var bodyContainer = dom.createDom("div",
		synthjs.ui.MenuAndBody.BODY_CONTAINER_CLASS_NAME_);
	
	this.setElementInternal(dom.createDom('div', synthjs.ui.MenuAndBody.CLASS_NAME_,
		menuContainer, bodyContainer
	));
	
	this._menuContainer = menuContainer;
	this._bodyContainer = bodyContainer;
	
	if( !this._menuComponent.getElement() ){
		this._menuComponent.createDom();
	}
	if( !this._bodyComponent.getElement() ){
		this._bodyComponent.createDom();
	}
	
	dom.appendChild(this._menuContainer, this._menuComponent.getElement());
	dom.appendChild(this._bodyContainer, this._bodyComponent.getElement());
};

/**
 * @override
 */
synthjs.ui.MenuAndBody.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	this._menuComponent.enterDocument();
	this._bodyComponent.enterDocument();
	
	this._attachEvent();
	this.onResize();
}

/**
 * @private
 */
synthjs.ui.MenuAndBody.prototype._attachEvent = function(){
	var dom = this.getDomHelper();
	this.getHandler()
		.listen(
			dom.getWindow(), 
			goog.events.EventType.RESIZE, 
			this.onResize
		);
}

/**
 * 
 */
synthjs.ui.MenuAndBody.prototype.onResize = function(){
	var size = this._vsm.getSize();
	goog.style.setStyle(
		this._bodyComponent.getElement(), 
		{
			height: (size.height-goog.style.getBounds(this._bodyComponent.getElement()).top)+"px",
			width: (size.width)+"px"
		}
	);
	
	var elSize = goog.style.getBorderBoxSize(this._bodyContainer);
	//this._bodyComponent.setSize(new goog.math.Size(elSize.width, elSize.height));
	
	this._bodyComponent.onResize(goog.style.getBorderBoxSize(this._bodyContainer));
}

/**
 * @type {string}
 * @private
 */
synthjs.ui.MenuAndBody.CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator");
	
/**
 * @type {string}
 * @private
 */
synthjs.ui.MenuAndBody.MENU_CONTAINER_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-menu-container");
	
/**
 * @type {string}
 * @private
 */
synthjs.ui.MenuAndBody.BODY_CONTAINER_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-workspace-container"); 
