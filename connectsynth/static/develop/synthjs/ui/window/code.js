goog.provide("synthjs.ui.window.Code");

goog.require("synthjs.ui.window.FileBase");
goog.require("synthjs.ui.window.EventType");
goog.require("goog.dom");
goog.require("synthjs.CodeMirror");
goog.require("synthjs.model.FileBase");

/**
 * @constructor
 * @extends {synthjs.ui.window.FileBase}
 * @param {synthjs.model.TextFile} file
 */
synthjs.ui.window.Code = function(file, opt_settings, opt_domHelper){
	
	this._editable = (typeof(opt_settings)=='undefined'||typeof(opt_settings.editable)=='undefined') 
		? true : !!opt_settings.editable;
	goog.base(this, file, opt_settings, opt_domHelper);
}

goog.inherits(synthjs.ui.window.Code, synthjs.ui.window.FileBase);

/**
 * @override
 */
synthjs.ui.window.Code.prototype.decorateInternal = function(element){
	goog.base(this, "decorateInternal", element);
	var defaultCode = this._file.get('content'); 
	var textarea = goog.dom.createDom("textarea", {}, defaultCode);
	goog.dom.appendChild(element, textarea);
	this._codeInternal = synthjs.CodeMirror.fromTextArea( 
		textarea, 
		{
			lineNumbers: true, 
			matchBrackets: true, 
			mode: 'javascript',
			onChange: goog.bind(this.onEditAreaChanged, this),
			readOnly: !this._editable
		} );

}

synthjs.ui.window.Code.prototype.getEditedCode = function(){
	return this._codeInternal.getValue();
}

synthjs.ui.window.Code.prototype.onEditAreaChanged = function(){
	this._arrangeStatus();
}
