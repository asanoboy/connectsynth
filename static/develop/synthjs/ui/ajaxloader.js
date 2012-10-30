goog.provide("synthjs.ui.AjaxLoader");

goog.require("goog.ui.ModalPopup");

/**
 * @constructor
 * @extends {goog.ui.ModalPopup}
 */
synthjs.ui.AjaxLoader = function(opt_useIframeMask, opt_domHelper){
	
	goog.base(this, opt_useIframeMask, opt_domHelper);
}
goog.inherits(synthjs.ui.AjaxLoader, goog.ui.ModalPopup);

synthjs.ui.AjaxLoader.prototype.setVisible = function(visible) {

	if(visible == this.isVisible()) {
		return;
	}
	
	// If the dialog hasn't been rendered yet, render it now.
	if(!this.isInDocument()) {
		this.render();
	}

	goog.base(this, 'setVisible', visible);
};

/**
 * @override
 */
synthjs.ui.AjaxLoader.prototype.getCssClass = function() {
	return goog.getCssName('ajaxloader');
};


synthjs.ui.AjaxLoader.prototype.createDom = function() {
	goog.base(this, 'createDom');
	var contentElem = this.getContentElement();
	contentElem.appendChild(
		this.getDomHelper().createDom("div", goog.getCssName(this.getCssClass(), 'img'))
	);
	goog.dom.setFocusableTabIndex(this.getElement(), false);
}