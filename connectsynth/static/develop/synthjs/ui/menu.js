goog.provide("synthjs.ui.Menu");

goog.require("goog.ui.Menu");
goog.require("goog.ui.MenuItem");
goog.require("goog.ui.MenuSeparator");
goog.require("goog.ui.MenuButton");

/**
 * @constructor
 * @extends {goog.ui.Menu}
 */
synthjs.ui.Menu = function(opt_domHelper, opt_renderer) {
	goog.base(this, opt_domHelper, opt_renderer);
}

goog.inherits(synthjs.ui.Menu, goog.ui.Menu);

/**
 * 
 */
synthjs.ui.Menu.createFromSetting = function(settinglist){
	var menu = new synthjs.ui.Menu();
	var EVENTS = goog.object.getValues(goog.ui.Component.EventType);
	
	goog.array.forEach( settinglist, function(subinfo){
		if( !subinfo.callback ) throw new Exeption("submenu info does not have callback");
		var item;
		if( subinfo.label ){
			item = new goog.ui.MenuItem(subinfo.label);
			item.setId(subinfo.label);
		}
		else {
			item = new goog.ui.MenuSeparator();
		}
		item.setDispatchTransitionEvents(goog.ui.Component.State.ALL, true);

		menu.getHandler().listen(item, EVENTS, function(e){
			if( e.type=='action' ){
				subinfo.callback();
			}
		});
		menu.addItem(item);
	});
	return menu;
}
