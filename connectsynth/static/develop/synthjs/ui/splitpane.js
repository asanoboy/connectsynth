goog.provide("synthjs.ui.SplitPane");

goog.require("goog.ui.SplitPane");
goog.require("goog.style");
/**
 * @constructor
 * @extends {goog.ui.SplitPane}
 */
synthjs.ui.SplitPane = function(firstComponent, secondComponent, orientation, opt_domHelper) {
    goog.base(this, firstComponent, secondComponent, orientation, opt_domHelper);
	
}

goog.inherits(synthjs.ui.SplitPane, goog.ui.SplitPane);

synthjs.ui.SplitPane.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	
	goog.style.setStyle( this.firstComponentContainer_, {"height": "100%"});
	goog.style.setStyle( this.secondComponentContainer_, {"height": "100%"});

	goog.style.setStyle( this.firstComponent_.getElement(), {"height": "100%"});
	goog.style.setStyle( this.secondComponent_.getElement(), {"height": "100%"});
	
	
	// prevent infinite loop.
	// this.getHandler()
		// .listen(
			// this, 
			// goog.events.EventType.CHANGE, 
			// this.onResize
		// )
}

/**
 * @param {goog.math.Size=} opt_size Container size. 
 */
synthjs.ui.SplitPane.prototype.onResize = function(opt_size){
	if( opt_size ){
		this.setSize(new goog.math.Size(opt_size.width, opt_size.height));
	}
	
	if( this.firstComponent_.onResize ){
		this.firstComponent_.onResize();
	}
	
	if( this.secondComponent_.onResize ){
		this.secondComponent_.onResize();
	}
}