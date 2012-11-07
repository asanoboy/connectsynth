goog.provide("synthjs.ui.MenuBar");

goog.require("goog.ui.Component");
goog.require("goog.array");
goog.require("goog.object");
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventType");

goog.require("synthjs.ui.Menu");
goog.require("goog.ui.menuBar");
goog.require("goog.ui.Menu");
goog.require("goog.ui.MenuItem");
goog.require("goog.ui.MenuSeparator");
goog.require("goog.ui.MenuButton");


/**
 * @constructor
 * @extends {goog.ui.Component}
 */
synthjs.ui.MenuBar = function(menuList, opt_domHelper){
	this._menuList = menuList;
	this._eventHandler = new goog.events.EventHandler();
	goog.base(this, opt_domHelper);
};

goog.inherits(synthjs.ui.MenuBar, goog.ui.Component);

synthjs.ui.MenuBar.createFromSetting = function(settings){
	
	var menubar = goog.ui.menuBar.create();
	//var eventHandler = new goog.events.EventHandler();
	var EVENTS = goog.object.getValues(goog.ui.Component.EventType);
	goog.array.forEach(settings, function(info){
		if( !info.label ) throw new Exeption("menu info does not have label");
		if( !info.sublist ) throw new Exeption("menu info does not have submenu");
	
		var menu = synthjs.ui.Menu.createFromSetting(info.sublist);
		var btn = new goog.ui.MenuButton(info.label, menu);
		btn.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
		menubar.addChild(btn, true);
		
	});
	return menubar;
}

/*
synthjs.ui.MenuBar.prototype.decorateInternal = function(el){alert("ok");
	this._menubar = goog.ui.menuBar.create();
	var EVENTS = goog.object.getValues(goog.ui.Component.EventType);
	goog.array.forEach(this._menuList, function(info){
		var menu = new goog.ui.Menu();
		if( !info.label ) throw new Exeption("menu info does not have label");
		if( !info.sublist ) throw new Exeption("menu info does not have submenu");
		goog.array.forEach( info.sublist, function(subinfo){
			var item;
			
			if( subinfo.label ){
				item = new goog.ui.MenuItem(subinfo.label);
				item.setId(subinfo.label);
			}
			else {
				item = new goog.ui.MenuSeparator();
			}
			item.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
			
			if( goog.isFunction(subinfo.callback) ) {
				this._eventHandler.listen(item, EVENTS, function(e){
					if( e.type=='action' ){
						subinfo.callback();
					}
				});
			}
			else {
				item.setSelectable(false);
			}
				
			
			menu.addItem(item);
		}, this);
		var btn = new goog.ui.MenuButton(info.label, menu);
		btn.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);
		this._menubar.addChild(btn, true);
		
	}, this);
	this._menubar.render(el);
};
*/