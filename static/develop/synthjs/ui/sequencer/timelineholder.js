goog.provide("synthjs.ui.sequencer.TimelineHolder");

goog.require("goog.ui.Component");
goog.require("synthjs.bridge.PNGlib");

goog.scope(function(){

    var TimelineHolder = synthjs.ui.sequencer.TimelineHolder = function(opt_domHelper){
        goog.base(this, opt_domHelper);
        this._headerHeight = 100;
        this._timelines = [];
    };

    goog.inherits(TimelineHolder, goog.ui.Component);

    var crcTable = null;
    goog.object.extend(TimelineHolder, {
        _ROOT_CLASSNAME: "timeline-holder",
        _HEADER_CLASSNAME: "timeline-holder-header",
        _HOLDER_CLASSNAME: "timeline-holder-holder",
        createBase64BackgroundImage: function(width, alpha){
            var png = new PNGlib(width, 1, alpha);
            png.color(0,0,0,0);
            png.buffer[png.index(width-1, 0)] = png.color(0, 0, 0, alpha);
            return "data:image/png;base64,"+png.getBase64();
        }
    });

    goog.object.extend(TimelineHolder.prototype, {

        onResize: function(){

            var style = goog.style;
            style.setHeight(this._headerElement, this._headerHeight);
            style.setHeight(this._holderElement,
                style.getBorderBoxSize(this.getElement()).height - this._headerHeight);


        },
        createDom: function(){
            this.setElementInternal(
                this.getDomHelper().createDom(
                    'div',
                    TimelineHolder._ROOT_CLASSNAME));
            this.decorateInternal(this.getElement());
        },
        decorateInternal: function(element){
            goog.base(this, "decorateInternal", element);


            var style = goog.style;
            style.setHeight(element, '100%');
            style.setWidth(element, '100%');
            var dom = this.getDomHelper();

            this._headerElement = dom.createDom(
                "div",
                TimelineHolder._HEADER_CLASSNAME);

            this._holderElement = dom.createDom(
                "div",
                TimelineHolder._HOLDER_CLASSNAME);
            dom.appendChild(element, this._headerElement);
            dom.appendChild(element, this._holderElement);

        },
        enterDocument: function(){
            var style = goog.style;
            style.setStyle(this._headerElement, {
                overflow: "hidden",
                backgroundImage: "url("+TimelineHolder.createBase64BackgroundImage(50, 0x80)+")"
            });
            style.setStyle(this._holderElement, {
                overflow: "scroll"
            });
            this.onResize();

            this.getHandler().listen(
                this._holderElement,
                goog.events.EventType.SCROLL,
                this.onHolderScroll,
                this);
        },

        onHolderScroll: function(event){

            var style = goog.style;
            style.setStyle(this._headerElement, {
                marginLeft: - event.target.scrollLeft +"px"
            });
            console.log(event.target.scrollLeft);
        },

        /**
         * Appended a new timeline.
         * @param  {synthjs.ui.sequencer.TimelineBase} timeline [description]
         * @return {null}          [description]
         */
        appendLine: function(timeline){
            var dom = this.getDomHelper();
            var wrapper = dom.createDom("div");
            dom.appendChild(this._holderElement, wrapper);
            timeline.render(wrapper);
            this._timelines.push({
                wrapper: wrapper,
                component: timeline
            });
        },

        removeLine: function(timeline){

        }


    });

});