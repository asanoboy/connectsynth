goog.provide("synthjs.ui.window.Oscillator");

goog.require("goog.style");
goog.require("synthjs.ui.window.Base");
goog.require("synthjs.ui.window.EventType");

goog.require("synthjs.ui.Keyboard");
goog.require("synthjs.ui.VerticalKeyboardRenderer");

/**
 * @constructor
 * @extends {synthjs.ui.window.Base}
 * @param {synthjs.ui.Keyboard} keyboard
 * @param {synthjs.ui.PluginControlPanel=} opt_controlPanel
 * @param {Object=} opt_settings
 */
synthjs.ui.window.Oscillator = function(keyboard, opt_controlPanel, opt_settings, opt_domHelper){
	this._keyboard = keyboard;
	this._controlPanel = opt_controlPanel;
	goog.base(this, 'debug', opt_settings, opt_domHelper);
}

goog.inherits(synthjs.ui.window.Oscillator, synthjs.ui.window.Base);

synthjs.ui.window.Oscillator.prototype.disposeInternal = function(){
	this._keyboard.dispose();
	this._keyboard = null;
	this._controlPanel.dispose();
	this._controlPanel = null;
};

synthjs.ui.window.Oscillator.prototype.decorateInternal = function(element){
	goog.base(this, "decorateInternal", element);
	
	var dom = this.getDomHelper();
	
	/**
	 * @type {Element}
	 */
	this._keyboardPane = dom.createDom("div", "window-oscillator-keyboard")
	
	/**
	 * @type {Element}
	 */
	this._oscillatorPane = dom.createDom("div", "window-oscillator-oscillator");
	
	this._keyboard.decorate(this._keyboardPane);
	
	// If control panel exists, display it on right pane.
	if( this._controlPanel ){
		this._controlPanel.decorate(this._oscillatorPane);
	}
	dom.append(element, this._keyboardPane);
	dom.append(element, this._oscillatorPane);
}

synthjs.ui.window.Oscillator.prototype.resize = function(){
	var dom = this.getDomHelper();
	var size = goog.style.getBorderBoxSize(this._keyboardPane);
	var parentSize = goog.style.getContentBoxSize(this.getElement());
	
	goog.style.setStyle(this._oscillatorPane, {"width": (parentSize.width-size.width)+"px"});
	
	if( this._controlPanel ){
		this._controlPanel.resize();
	}
}
