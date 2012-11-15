goog.provide("synthjs.ui.window.FileBase");

/**
 * @constructor
 * @extends {synthjs.ui.window.FileBase}
 * @param {synthjs.model.FileBase} file
 */
synthjs.ui.window.FileBase = function(file, opt_settings, opt_domHelper){
	this._file = file;
	
	/**
	 * @protected
	 */
	this._isChanged = false;
	goog.base(this, file.get("filename"), opt_settings, opt_domHelper);
}

goog.inherits(synthjs.ui.window.FileBase, synthjs.ui.window.Base);

/**
 * @param {synthjs.ui.window.Base} window
 * @override
 */
synthjs.ui.window.FileBase.prototype.equals = function(window){
	return goog.base(this, 'equals', window) 
		&& this.getFile().equals(window.getFile());
} 

synthjs.ui.window.FileBase.prototype.getFile = function(){
	return this._file;
}

/**
 * @override
 */
synthjs.ui.window.FileBase.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	this.getHandler().listen(
		this._file, 
		synthjs.model.EventType.CHANGE, 
		this._onFileChange);
}

/**
 * @protected
 */
synthjs.ui.window.FileBase.prototype._onFileChange = function(e){
	switch( e.target.attr ){
		case "filename":
			this._dispatchChangeLabel(e.target.after);
			break;
		case "content":
			this._arrangeStatus();
			break;
	}
	
}

/**
 * @protected
 */
synthjs.ui.window.FileBase.prototype._arrangeStatus = function(){
	if( !this._isChanged && ( this._codeInternal.getValue() != this._file.get("content") ) ){
		this._dispatchChangeLabel("*" + this._file.get("filename"));
		this._isChanged = true;
	}
	else if( this._isChanged && ( this._codeInternal.getValue() == this._file.get("content") ) ){
		this._dispatchChangeLabel(this._file.get("filename"));
		this._isChanged = false;
	}	
}

/**
 * @return {boolean} Whether edited code is defferent with saved code or not.
 */
synthjs.ui.window.FileBase.prototype.isChanged = function(){
	return this._isChanged;
}

synthjs.ui.window.FileBase.prototype._dispatchChangeLabel = function(label){
	this.dispatchEvent(
		new goog.events.Event(
			synthjs.ui.window.EventType.CHANGE_LABEL, 
			{
				windowObject: this, 
				filename: label
			}
		)
	);
}