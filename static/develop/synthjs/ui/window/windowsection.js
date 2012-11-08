goog.provide("synthjs.ui.window.WindowSection");

goog.require('synthjs.ui.window.EventType');
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventType");
goog.require("goog.ui.Component");
goog.require("goog.math.Size");
goog.require("goog.dom");
goog.require("goog.style");
goog.require("goog.dom.query");
goog.require("goog.dom.classes");
goog.require("goog.object");
goog.require("goog.array");


goog.scope(function(){
	
var dom = goog.dom, 
	classes = goog.dom.classes,
	style = goog.style,
	query = goog.dom.query,
	events = goog.events,
	object = goog.object,
	array = goog.array;

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
synthjs.ui.window.WindowSection = function(htmlString, settings, opt_domHelper){
	this._windowInfoList = [];
	this._headerList = {};
	this._labelList = {};
	this._bodyList = {};
	this._activeWindowInfo = null;
	this._currentZIndex = 0;
	this._currentIndex = 0;
	this._htmlString = htmlString;
	this._eventHandler = new goog.events.EventHandler();
	
	/**
	 * @type {Array}
	 * Keep windowIndex ordered by activation
	 */
	this._windowIndexOrder = [];
	
	this._windowEventHandlers = [];
	this._windowEventHandlersIndexToWindow = {};
	
	goog.base(this, opt_domHelper);
}

goog.inherits(synthjs.ui.window.WindowSection, goog.ui.Component);

synthjs.ui.window.WindowSection.prototype._getEventHandler = function(window){

	var index = object.findKey(this._windowEventHandlersIndexToWindow, function(e){
		//return e == window;
		return e.equals(window);
	});
	
	if( goog.isString(index) ){
		var handler = this._windowEventHandlers[index];
	}
	else {
		var handler = new events.EventHandler();
		this._windowEventHandlers.push(handler);
		this._windowEventHandlersIndexToWindow[this._windowEventHandlers.length-1] = window;
	}
	
	return handler;
}

synthjs.ui.window.WindowSection.prototype._detachWindowEventInternal = function(window){
	
	var index = object.findKey(this._windowEventHandlersIndexToWindow, function(e){
		return e == window;
	});
	
	if( goog.isString(index) ){
		this._windowEventHandlers[index].dispose();
		this._windowEventHandlers[index] = false;
		delete this._windowEventHandlersIndexToWindow[index];
		return true;
	}
	else {
		return false;
	}
	
}

//synthjs.ui.window.WindowSection.prototype.

//synthjs.ui.window.WindowSection.CLASS_NAME_ = goog.getCssName("windowsection");

synthjs.ui.window.WindowSection.prototype.createDom = function(){
	//var $ = goog.dom.createDom;
	var $wrapper = dom.htmlToDocumentFragment(this._htmlString);
	this.setElementInternal($wrapper);
}

/**
 * @public
 * @return {synthjs.ui.window.Base|null}
 */
synthjs.ui.window.WindowSection.prototype.getActiveWindow = function(){
	if( this._activeWindowInfo ){
		return this._activeWindowInfo.window;
	}
	return null;
}

synthjs.ui.window.WindowSection.prototype.getHeaderElement = function(){
	var list = query(".windowsection-header", this.getElement());
	if( list.length!=1 ) throw new Error("fatal error");
	return list[0];
}

synthjs.ui.window.WindowSection.prototype.getBodyElement = function(){
	var list = query(".windowsection-body", this.getElement());
	if( list.length!=1 ) throw new Error("fatal error");
	return list[0];
}

synthjs.ui.window.WindowSection.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	this.onResize();
}

synthjs.ui.window.WindowSection.prototype.addWindow = function(window, settings){
	//var $ = goog.dom.createDom;
	this._windowInfoList.push({window: window, settings: settings, index:this._currentIndex});
	var body = dom.htmlToDocumentFragment(
		"<div class='windowIndex"+this._currentIndex+" windowsection-body-inner-wrapper'></div>"
	);
	
	var headerHtml = "<div class='windowsection-header-label-inner-wrapper windowHeaderIndex"+this._currentIndex+"'>" + 
			"<div class='windowsection-header-label left'></div>" + 
			"<div class='windowsection-header-label center'><span class='windowsection-header-label-text'>"+window.getLabel()+"</span>";
	if( window.isDeletable() ){
		headerHtml += "<a class='windowsection-header-label-closebutton' href='#'>x</a>";
	}
	
	headerHtml += "</div>" + 
			"<div class='windowsection-header-label right'></div>" +
		"</div>"; 
	
	var header = dom.htmlToDocumentFragment(headerHtml);
	
	this._attachWindowEventInternal(window, header, body);
	dom.appendChild(this.getBodyElement(), body);
	dom.appendChild(this.getHeaderElement(), header);
	this._bodyList[this._currentIndex] = body;
	this._headerList[this._currentIndex] = header;
	this._labelList[this._currentIndex] = query(".windowsection-header-label-text", header)[0];
	
	window.decorate(body);
	
	this.onResize();
	this._currentIndex++;
	
	
	this.activate(window);
}

synthjs.ui.window.WindowSection.prototype.onChangeLabel = function(e){
	this.setLabel(e.target.windowObject, e.target.filename);
}

synthjs.ui.window.WindowSection.prototype.setLabel = function(window, label){
	var changed = 0;
	goog.array.forEach(this._windowInfoList, function(info){
		//if( info.window == window ){
		if( window.equals(info.window) ){
			dom.setTextContent( this._labelList[info.index], label );
			info.label = label;
			changed ++;
		}
	}, this)
	if( changed!=1 )throw new Error("component does not exist in _windowInfoList at setLabel()");
}


/**
 * @param {synthjs.ui.window.base} window
 */
synthjs.ui.window.WindowSection.prototype.hasWindow = function(window){
	
	var rt = goog.array.filter(this._windowInfoList, function(info){
		return window.equals(info.window);
	}, this);
	
	return rt.length==0 ? false : true;	
}

/**
 * @param {synthjs.ui.window.Base=} opt_window If opt_window is false, activate last active window in this._windowInfoList.
 */
synthjs.ui.window.WindowSection.prototype.activate = function(opt_window){
	if( !opt_window ){
		// TODO: performance tuning: too many loop
		
		var lastIndex = goog.array.findRight(this._windowIndexOrder, function(index){
			return goog.array.find(this._windowInfoList, function(info){
				return info.index==index;
			});
		}, this);
		
		
		if( goog.isNumber(lastIndex) ){
			var windowInfo = goog.array.find(this._windowInfoList, function(info){
				return info.index==lastIndex;
			});
			
			this.activate(windowInfo.window);
		}
		return;
	}
	
	var window = opt_window;
	
	var active = goog.array.find(this._windowInfoList, function(info){
		//return info.window == window;
		return info.window.equals(window); 
	})
	if( !active ) throw new Error("window section doesn't have the window object to activate.")
	
	goog.array.forEach(this._windowInfoList, function(info){
		//if( window == info.window ){
		if( window.equals(info.window) ){
			dom.classes.add(this._headerList[info.index], "active");
			goog.array.forEach(query(".windowsection-header-label", this._headerList[info.index]), function(element){
				style.setStyle(element, {"z-index": this._currentZIndex});
				classes.add(element, "active");
			})
			dom.classes.add(this._bodyList[info.index], "active");
			style.showElement(this._bodyList[info.index], true);
			//goog.style.setStyle(this._bodyList[info.index], {"z-index": 1});
		}
		else {
			classes.remove(this._headerList[info.index], "active");
			goog.array.forEach(query(".windowsection-header-label", this._headerList[info.index]), function(element){
				classes.remove(element, "active");
			})
			classes.remove(this._bodyList[info.index], "active");
			style.showElement(this._bodyList[info.index], false);
			//goog.style.setStyle(this._bodyList[info.index], {"z-index": 0});
		}
	}, this);
	
	this._currentZIndex++;
	
	window.resize();
	this._pushLastActiveIndex(active.index);
	this._activeWindowInfo  = active;
}

/**
 * Pushes last active index and remove non-exist index.  
 */
synthjs.ui.window.WindowSection.prototype._pushLastActiveIndex = function(index){
	this._windowIndexOrder.push(index);
	// TODO: removeDuplicates from right.
	//goog.array.removeDuplicates(this._windowIndexOrder);
	this._windowIndexOrder = goog.array.filter(this._windowIndexOrder, function(index){
		return goog.array.find(this._windowInfoList, function(info){
			return info.index==index;
		})
	}, this);
}

/**
 * @private
 */
synthjs.ui.window.WindowSection.prototype._attachWindowEventInternal = function(window, header, body){
	
	var button = dom.findNode(header, function(node){
		return classes.has(node, "windowsection-header-label-closebutton"); 
	});
	
	this.getHandler()
		.listen(header, 
			goog.events.EventType.CLICK, 
			function(e){
				this.activate(window);
			})
		.listen(body, 
			goog.events.EventType.CLICK, 
			function(e){
				this.activate(window);
			})
		// .listen(button, 
			// goog.events.EventType.CLICK, 
			// function(e){
				// this.removeWindow(window);
				// e.preventDefault();
				// e.stopPropagation(); // Stop activating this window.
			// })
		.listen(window, 
			synthjs.ui.window.EventType.CHANGE_LABEL, 
			this.onChangeLabel);
	if( button ){
		this.getHandler()
			.listen(button, 
				goog.events.EventType.CLICK, 
				function(e){
					this.removeWindow(window);
					e.preventDefault();
					e.stopPropagation(); // Stop activating this window.
				});	
	}
}

/**
 * @param {synthjs.ui.window.Base} window
 */
synthjs.ui.window.WindowSection.prototype.removeWindow = function(window){
	
	// remove the window event
	this._detachWindowEventInternal(window);
	
	// remove window dom element
	object.forEach( 
		array.filter(
			this._windowInfoList, 
			function(info){
				return window.equals(info.window);
			}
		), 
		function(info){
			array.forEach( // remove window body.
				query(".windowIndex"+info.index, this.getElement()),
				function(el){
					dom.removeNode(el);
				},
				this
			);
			array.forEach( // remove window header tab.
				query(".windowHeaderIndex"+info.index, this.getElement()),
				function(el){
					dom.removeNode(el);
				},
				this
			);
		},
		this
	);
	
	// remove the internal window information
	this._windowInfoList = array.filter(
		this._windowInfoList, 
		function(info){
			return !window.equals(info.window);
		}
	)
	
	window.dispose();
	this.activate();
	return;
}

synthjs.ui.window.WindowSection.prototype.onResize = function(size){
	
	var headerSize = style.getBorderBoxSize(this.getHeaderElement()),
		bodySize = style.getBorderBoxSize(this.getBodyElement()),
		parentSize = style.getBorderBoxSize(dom.getAncestor(this.getElement(), function(node){return true;}));
	
	style.setBorderBoxSize( this.getBodyElement(), new goog.math.Size(
		parentSize.width,
		parentSize.height - headerSize.height
	));
	
	goog.array.forEach(this._windowInfoList, function(info){
		info.window.resize();
	})
};

})