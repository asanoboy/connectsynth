goog.provide("synthjs.ui.window.Image");

goog.require("synthjs.ui.window.FileBase");
goog.require("synthjs.ui.window.EventType");
goog.require("goog.dom");
goog.require("synthjs.model.FileBase");


/**
 * @constructor
 * @extends {synthjs.ui.window.FileBase}
 * @param {synthjs.model.ImageFile} file
 */
synthjs.ui.window.Image = function(file, opt_settings, opt_domHelper){
	goog.base(this, file, opt_settings, opt_domHelper);
}

goog.inherits(synthjs.ui.window.Image, synthjs.ui.window.FileBase);

/**
 * @override
 */
synthjs.ui.window.Image.prototype.decorateInternal = function(element){
	goog.base(this, "decorateInternal", element);
	var dataUrl = this._file.getDataUrl(); 
	// console.log(this._file);
	/**
	 * @type {Element}
	 */
	this._imgtag = goog.dom.createDom("img");
	
	this.getHandler().listen(
		this._imgtag,
		goog.events.EventType.LOAD,
		function(){
			this.resize();
		});
	goog.dom.setProperties(this._imgtag, {"src": dataUrl});
	
	goog.style.setStyle(this._imgtag, {
		marginTop: "100px"
	});
	
	goog.dom.appendChild(element, this._imgtag);
	
}

/**
 * @override
 */
synthjs.ui.window.Image.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
}

synthjs.ui.window.Image.prototype.resize = function(){
	var size = goog.style.getContentBoxSize(this.getElement());
	var imgSize = goog.style.getBorderBoxSize(this._imgtag);

	goog.style.setStyle(this._imgtag, {
		marginLeft: (size.width-imgSize.width)/2 + "px"
	});
}
