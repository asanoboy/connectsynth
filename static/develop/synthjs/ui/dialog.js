goog.provide("synthjs.ui.Dialog");

goog.require("goog.ui.Dialog");

/**
 * @constructor
 * @extends {goog.ui.Dialog}
 */
synthjs.ui.Dialog = function(opt_class, opt_useIframeMask, opt_domHelper) {
    goog.base(this, opt_class, opt_useIframeMask, opt_domHelper);
    
}

goog.inherits(synthjs.ui.Dialog, goog.ui.Dialog);

/**
 * 
 */
synthjs.ui.Dialog.prototype.setContentElement = function(el){
	this._contentElement = el;
}

synthjs.ui.Dialog.prototype._getContentElement = function(){
	return this._contentElement ? this._contentElement : false; 
}

/**
 * @override
 */
synthjs.ui.Dialog.prototype.createDom = function(){
	goog.base(this, 'createDom');
	
	var el = this._getContentElement();
	if( el ){
		var contentEl = this.getContentElement();
		contentEl.appendChild(el);
	}
}

/**
 * Shortcut
 * @param {string} title
 * @param {string} content
 */
synthjs.ui.Dialog.alertOK = function(title, content){
	var handler = new goog.events.EventHandler();
	var dialog = new synthjs.ui.Dialog();
	dialog.setTitle(title);
	dialog.setContent(content);
	dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
	handler.listen(
		dialog,
		goog.ui.Dialog.EventType.SELECT,
		function(){
			handler.dispose();
		}
	);
	dialog.setVisible(true);
	
		
}
