goog.provide("synthjs.ui.AjaxDialog");


goog.require("goog.ui.Dialog");
goog.require("goog.ui.Dialog.ButtonSet");
goog.require("synthjs.utility.AjaxDeferred");

/**
 * @constructor
 * @extends {goog.ui.Dialog}
 * @param {string} title
 * @param {goog.Uri} uri
 */
synthjs.ui.AjaxDialog = function(title, uri, opt_class, opt_useIframeForIE, opt_domHelper){
	goog.base(this, opt_class, opt_useIframeForIE, opt_domHelper);
	
	this.setButtonSet(new goog.ui.Dialog.ButtonSet().
		addButton(goog.ui.Dialog.ButtonSet.DefaultButtons.CANCEL, false, true));
		
	// console.log(goog.ui.Dialog.ButtonSet.CANCEL);
	this._hasGotContent = false;
	this._contentUri = uri;
}
// console.log(synthjs.ui.AjaxDialog);
// console.log(goog.ui.Dialog);
goog.inherits(synthjs.ui.AjaxDialog, goog.ui.Dialog);

/**
 * @override
 */
synthjs.ui.AjaxDialog.prototype.setVisible = function(visible){
	if( this._hasGotContent ){
		goog.base(this, "setVisible", visible);
	}
	else{
		new synthjs.utility.AjaxDeferred(this._contentUri.toString(), {
			success: goog.bind(function(e){
				this.setContent(e.getResponse());
				this._hasGotContent = true;
				this.setVisible(visible);
			}, this)
		}).callback();
	}
}
