goog.provide("synthjs.ui.PluginControlPanel");
goog.provide("synthjs.ui.PluginControlPanelEventType");

goog.require("synthjs.ui.graphics.ControlButton");
goog.require("synthjs.ui.graphics.ToggleButton");
goog.require("synthjs.ui.graphics.RadioButton");
goog.require("goog.graphics");
goog.require("goog.ui.Component");

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {string} background image path
 * @param {synthjs.model.Collection} paramCollection
 * @param {Object} setting
 */
synthjs.ui.PluginControlPanel = function(paramCollection, 
		backgroundImage, width, height, opt_domHelper){
	
	this._backgroundImageSrc = backgroundImage;
	this._backgroundWidth = width;
	this._backgroundHeight = height;
	this._paramCollection = paramCollection;
	this._controlList = [];
	
	goog.base(this, opt_domHelper);
	
}

goog.inherits(synthjs.ui.PluginControlPanel, goog.ui.Component);

synthjs.ui.PluginControlPanel.prototype.decorateInternal = function(element){
	goog.base(this, 'decorateInternal', element);
	var dom = this.getDomHelper();
	
	/**
	 * @type {Element}
	 */
	this._wrapper = dom.createDom("div", "plugin-controlpanel-wrapper");
	
	this._graphics = goog.graphics.createGraphics(this._backgroundWidth, this._backgroundHeight);
	
	this._backgrounGraphicElement = this._graphics.drawImage(
		0,0,
		this._backgroundWidth,  
		this._backgroundHeight,
		this._backgroundImageSrc);
	
	goog.style.setStyle( this._wrapper, {
		"width": this._width+"px",
		"height": this._height+"px"
	});
	
	goog.array.forEach(this._paramCollection.getAll(), function(paramModel){
		if( paramModel instanceof synthjs.model.PluginControlParam ){
			var controlButton = new synthjs.ui.graphics.ControlButton(paramModel);
		}
		else if( paramModel instanceof synthjs.model.PluginToggleParam ){
			var controlButton = new synthjs.ui.graphics.ToggleButton(paramModel);
		}
		else if( paramModel instanceof synthjs.model.PluginRadioParam ){
			var controlButton = new synthjs.ui.graphics.RadioButton(paramModel);
		}
		else {
			goog.asserts.assert(false);
		}
		
		controlButton.decorate(this._graphics);
		this._controlList.push(controlButton);
	}, this);
	
	dom.appendChild(element, this._wrapper);
	this._graphics.render(this._wrapper);
}

synthjs.ui.PluginControlPanel.prototype.enterDocument = function(){
	var events = goog.object.getValues(goog.events.EventType);
	
	this.getHandler().
		// This handler prevents ControlPanel use to effect to browser default behavior.
		// Example for selection text by mousemove event.
		listen(
			this._graphics.getElement(),
			events,
			function(e){
				e.preventDefault();
			}
		)
	
}

synthjs.ui.PluginControlPanel.prototype.getBackgroundWidth = function(){
	return this._backgroundWidth;
}

synthjs.ui.PluginControlPanel.prototype.getBackgroundHeight = function(){
	return this._backgroundHeight;
}

/**
 * This puts controlpanel on center of the pane.
 */
synthjs.ui.PluginControlPanel.prototype.resize = function(){
	
	var size = goog.style.getContentBoxSize( this.getElement() );
	var dom = this.getDomHelper();
	goog.style.setStyle(this._wrapper, {
		marginLeft: (size.width - this._backgroundWidth)/2+"px"
	});
}
