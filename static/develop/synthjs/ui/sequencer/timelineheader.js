goog.provide("synthjs.ui.sequencer.TimelineHeader");

goog.require("synthjs.ui.sequencer.TimelineBase");
goog.require("synthjs.bridge.PNGlib");

goog.scope(function(){

var TimelineHeader = synthjs.ui.sequencer.TimelineHeader = function(opt_domHelper){
    goog.base(this, opt_domHelper);
    this._scaleElements = [];
    this._tick = 50;
    this._height = 100;
};
goog.inherits(TimelineHeader, synthjs.ui.sequencer.TimelineBase);

goog.object.extend(TimelineHeader, {
    // _WRAPPER_CLASSNAME: "timeline-header-wrapper",
    createBase64BackgroundImage: function(width, alpha){
        var png = new PNGlib(width, 1, alpha);
        png.color(0,0,0,0);
        png.buffer[png.index(width-1, 0)] = png.color(0, 0, 0, alpha);
        return "data:image/png;base64,"+png.getBase64();
    }

});

goog.object.extend(TimelineHeader.prototype, {
    // createDom: function(){
    //     this.setElementInternal(
    //         this.getDomHelper().createDom(
    //             'div',
    //             TimelineHeader._WRAPPER_CLASSNAME));
    //     this.decorateInternal(this.getElement());
    // },
    decorateInternal: function(element){
        goog.base(this, "decorateInternal", element);
        var dom = this.getDomHelper();
        this._wrapperElement = dom.createDom(
            "div",
            TimelineHeader._CONTENT_CLASSNAME);
        goog.style.setStyle(this._wrapperElement, {
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100%"
        });
        goog.style.setHeight(element, this._height);
        dom.appendChild(element, this._wrapperElement);
    },
    enterDocument: function(){
        this.drawScale();
    },
    setWidth: function(width){
        goog.style.setWidth( this._wrapperElement, width );
        this.drawScale();
    },
    drawScale: function(){
        var style = goog.style, dom = this.getDomHelper();
        style.setStyle(this._wrapperElement, {
            backgroundImage: "url("+TimelineHeader.createBase64BackgroundImage(this._tick, 0x30)+")"
        });
        var current = 0;

        goog.array.forEach(this._scaleElements, function(elem){
            dom.removeNode(elem);
        });
        this._scaleElements = [];
        var elem, size = style.getBorderBoxSize(this._wrapperElement);
        while( current*this._tick < size.width ){
            elem = dom.createDom("span");
            dom.setTextContent(elem, current+1);
            style.setStyle(elem, {
                position: "absolute",
                left: current * this._tick + "px"
            });
            dom.appendChild(this._wrapperElement, elem);
            this._scaleElements.push(elem);
            current ++;
        }
    }
});
});