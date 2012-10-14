goog.provide("synthjs.ui.window.WindowHolder");

goog.require("synthjs.ui.window.WindowSection");
goog.require("goog.ui.Component");
goog.require("goog.dom");

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
synthjs.ui.window.WindowHolder = function(opt_domHelper){
	this._windowSectionHtml = 
		"<div class='windowsection'>" +
			"<div class='windowsection-header'></div>" +
			"<div class='windowsection-body_wrapper'>" +
				"<div class='windowsection-body'></div>" +
			"</div>" +
		"</div>";
	this._windowSectionList = [];
	this._activeWindowSection = null;
	this._componentList = [];
	
	goog.base(this, opt_domHelper);
};

goog.inherits(synthjs.ui.window.WindowHolder, goog.ui.Component);

synthjs.ui.window.WindowHolder.CLASS_NAME_ = 
	goog.getCssName("windowholder");


synthjs.ui.window.WindowHolder.WRAPPER_CLASS_NAME_ = 
	goog.getCssName("synthjs-sdkoscillator-windowholder-pane");


synthjs.ui.window.WindowHolder.prototype.decorateInternal = function(element){
	goog.base(this, "decorateInternal", element);
	goog.dom.appendChild(element, goog.dom.createDom("div", {"class":synthjs.ui.window.WindowHolder.CLASS_NAME_}));
	goog.dom.classes.add(element, synthjs.ui.window.WindowHolder.WRAPPER_CLASS_NAME_ );
};

synthjs.ui.window.WindowHolder.prototype.createDom = function(){
	var $wrapper = goog.dom.createDom('div', synthjs.ui.window.WindowHolder.CLASS_NAME_);//goog.dom.htmlToDocumentFragment(this._windowSectionHtml);
	this.setElementInternal($wrapper);
};

synthjs.ui.window.WindowHolder.prototype.disposeInternal = function(){
	goog.base(this, 'disposeInternal');
};

/**
 * If 'this' has the 'window', 'this' add window internally, else activate 'window' of 'this'.
 * @param {synthjs.ui.window.Base} window
 */
synthjs.ui.window.WindowHolder.prototype.addWindow = function(window){
	if( this._activeWindowSection == null ){
		this._activeWindowSection = new synthjs.ui.window.WindowSection(this._windowSectionHtml);
		this._activeWindowSection.render(this.getElement());
		this._windowSectionList.push(this._activeWindowSection);
	}
	
	if( this.hasWindow(window) ){
		this.activateWindow(window);
	}
	else{
		this._activeWindowSection.addWindow(window);
	}
		
};

/**
 * @param {synthjs.ui.window.Base} window
 */
synthjs.ui.window.WindowHolder.prototype.hasWindow = function(window){
	var hasWindow = false;
	goog.array.forEach(this._windowSectionList, function(section){
		hasWindow |= section.hasWindow(window);
	}, this);
	
	return hasWindow;
}

/**
 * @param {synthjs.ui.window.Base} window
 */
synthjs.ui.window.WindowHolder.prototype.activateWindow = function(window){
	goog.array.forEach(this._windowSectionList, function(section){
		section.activate(window);
	}, this);
}

/**
 * @return {number} number of removed window 
 */
synthjs.ui.window.WindowHolder.prototype.removeWindow = function(window){
	
	var removed = 0;
	goog.array.forEach(this._windowSectionList, function(section){
		if( section.hasWindow(window) ){
			section.removeWindow(window);
			removed++;
		}
	}, this);
	
	if( removed ){
		window.dispose();
	}
	return removed;
}


/**
 * @public
 * @return {synthjs.ui.window.Base|null}
 */
synthjs.ui.window.WindowHolder.prototype.getActiveWindow = function(){
	
	if( this._activeWindowSection ){
		var win = this._activeWindowSection.getActiveWindow();
		if( win ){
			return win;
		}
	}
	return null;
}

synthjs.ui.window.WindowHolder.prototype.onResize = function(size){
	goog.array.forEach(this._windowSectionList, function(winsec){
		winsec.onResize(size);
	});
};