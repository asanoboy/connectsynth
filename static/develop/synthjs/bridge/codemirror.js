goog.provide("synthjs.CodeMirror");

/**
 * @constructor
 */
synthjs.CodeMirror = function(codemirror){
	this._codemirror = codemirror;
}

synthjs.CodeMirror.prototype.focus = function(){
	return this._codemirror['focus']();
}

synthjs.CodeMirror.prototype.getValue = function(opt_lineSeparator){
	if( opt_lineSeparator ){
		return this._codemirror['getValue']().split("\n").join(opt_lineSeparator);
	}
	return this._codemirror['getValue']();
}

synthjs.CodeMirror.fromTextArea = function(el, opt_settings){
	var settings = {};
	
	if( opt_settings ){
		opt_settings.lineNumbers && 
			(settings['lineNumbers'] = opt_settings.lineNumbers);
		opt_settings.matchBrackets && 
			(settings['matchBrackets'] = opt_settings.matchBrackets);
		opt_settings.mode && 
			(settings['mode'] = opt_settings.mode);
		opt_settings.onChange && 
			(settings['onChange'] = opt_settings.onChange);
		opt_settings.readOnly && 
			(settings['readOnly'] = opt_settings.readOnly);
		
	}
	
	return new synthjs.CodeMirror(CodeMirror['fromTextArea'](el, settings));
}
