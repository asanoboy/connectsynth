goog.provide("synthjs.ui.TextPrompt");

goog.require("goog.ui.Prompt");

/**
 * @constructor
 * @extends {goog.ui.Prompt}
 */
synthjs.ui.TextPrompt = function(promptTitle, promptText, callback, opt_defaultValue,
    	opt_class, opt_useIframeForIE, opt_domHelper){
    
    this._internalCallback = callback;
    
    goog.base(this, promptTitle, promptText, goog.bind(this._callbackHandler, this), opt_defaultValue,
    	opt_class, opt_useIframeForIE, opt_domHelper)
    
}

goog.inherits(synthjs.ui.TextPrompt, goog.ui.Prompt);

/**
 * @override
 */
synthjs.ui.TextPrompt.prototype.createDom = function(){
	goog.base(this, "createDom");
	
	var cls = this.getClass();
	var attrs = {
	    'className': goog.getCssName(cls, 'userInput')};
	this._textareaElem = this.getDomHelper().createDom('textarea', attrs);
	if( this._textCols ){
		this._textareaElem.cols = this._textCols; 
	}
	if( this._textRows ){
		this._textareaElem.rows = this._textRows; 
	}
	var contentEl = this.getContentElement();
	contentEl.appendChild(this.getDomHelper().createDom("br"));
	contentEl.appendChild(this.getDomHelper().createDom(
		'div', {'style': 'overflow: auto'}, this._textareaElem 
	))
}


synthjs.ui.TextPrompt.prototype.setTextCols = function(cols){
	this._textCol = cols;
}

synthjs.ui.TextPrompt.prototype.setTextRows = function(rows){
	this._textRows = rows;
}

synthjs.ui.TextPrompt.prototype._callbackHandler = function(inputValue){
	this._internalCallback(inputValue, this._textareaElem.value);
	
}

/** @override */
synthjs.ui.TextPrompt.prototype.disposeInternal = function() {
  goog.dom.removeNode(this.userInputEl_);

  goog.events.unlisten(this, goog.ui.Dialog.EventType.SELECT,
      this.onPromptExit_, true, this);

  goog.ui.Prompt.superClass_.disposeInternal.call(this);

  this.defaulValue_ = null;
  this.userInputEl_ = null;
};