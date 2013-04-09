goog.provide("synthjs.ui.sequencer.TimelineHolder");

goog.require("synthjs.ui.sequencer.TimelineHeader");
goog.require("goog.ui.Component");

goog.scope(function(){

    var TimelineHolder = synthjs.ui.sequencer.TimelineHolder = function(opt_domHelper){
        goog.base(this, opt_domHelper);
        this._headerHeight = null;
        this._headerScrollbarMargin = 30;
        this._currentWidth = null;
        this._timelines = [];
        this._headerComponent = null;
        this._needle = null;
        this._needleOffset = 0;
    };

    goog.inherits(TimelineHolder, goog.ui.Component);

    var crcTable = null;
    goog.object.extend(TimelineHolder, {
        _ROOT_CLASSNAME: "timeline-holder",
        _HEADER_CLASSNAME: "timeline-holder-header",
        _HEADER_INNERWRAPPER_CLASSNAME: "timeline-holder-header-innerwrapper",
        _HOLDER_CLASSNAME: "timeline-holder-holder",
        _NEEDLE_CLASSNAME: "timeline-needle"
    });

    goog.object.extend(TimelineHolder.prototype, {

        onResize: function(){
            var style = goog.style;
            style.setHeight(this._holderElement,
                style.getBorderBoxSize(this.getElement()).height - this._headerHeight
            );
        },
        // onChangeContentWidth: function(){
        orderWidth: function(){
            var style = goog.style,
                width = style.getBorderBoxSize(this.getElement()).width,
                size;

            goog.array.forEach(this._timelines, function(timeline){
                size = style.getBorderBoxSize(timeline.component.getElement());
                if( width < timeline.component.getWidth() ){ //size.width ){
                    width = timeline.component.getWidth();//size.width;
                }
            });
            this._currentWidth = width;
            this._headerComponent.setWidth( width );
            goog.array.forEach(this._timelines, function(e){
                e.component.setWidth(width, true);
            });
        },
        createDom: function(){
            this.setElementInternal(
                this.getDomHelper().createDom(
                    'div',
                    TimelineHolder._ROOT_CLASSNAME));
            this.decorateInternal(this.getElement());
        },
        setNeedleOffset: function(offset){
            this._needleOffset = offset;
            goog.style.setStyle(this._needle, {
                left: offset + 'px'
            });
        },
        decorateInternal: function(element){
            goog.base(this, "decorateInternal", element);


            var style = goog.style;
            style.setHeight(element, '100%');
            style.setWidth(element, '100%');
            var dom = this.getDomHelper();

            this._headerWrapper = dom.createDom(
                "div",
                TimelineHolder._HEADER_CLASSNAME);

            this._headerInnerWrapper = dom.createDom(
                "div",
                TimelineHolder._HEADER_INNERWRAPPER_CLASSNAME);

            this._holderElement = dom.createDom(
                "div",
                TimelineHolder._HOLDER_CLASSNAME);

            dom.appendChild(element, this._headerWrapper);
            dom.appendChild(this._headerWrapper, this._headerInnerWrapper);
            this._headerComponent = new synthjs.ui.sequencer.TimelineHeader();
            this._headerComponent.render(this._headerInnerWrapper);
            dom.appendChild(element, this._holderElement);

            this._needle = dom.createDom(
                "div",
                TimelineHolder._NEEDLE_CLASSNAME);
            dom.appendChild(element, this._needle);
        },
        enterDocument: function(){
            var style = goog.style;
            this._headerHeight= style.getBorderBoxSize(this._headerComponent.getElement()).height;
            style.setHeight(this._headerWrapper, this._headerHeight);
            style.setHeight(this._headerInnerWrapper, this._headerHeight + this._headerScrollbarMargin);
            style.setHeight(this._needle, style.getBorderBoxSize(this.getElement()).height);
            style.setWidth(this._needle, 1);
            style.setStyle(this._needle, {
                position: "absolute",
                backgroundColor: "#000",
                borderLeft: "1px #FFF solid",
                borderRight: "1px #FFF solid",
                top: 0
            });
            style.setStyle(this.getElement(), {
                position: "relative"
            });
            style.setStyle(this._headerWrapper, {
                overflow: "hidden"
            });
            style.setStyle(this._headerInnerWrapper, {
                overflow: "scroll"
            });
            style.setStyle(this._holderElement, {
                overflow: "scroll"
            });
            this.setNeedleOffset(this._needleOffset);
            this.onResize();
            this.orderWidth();
            this.getHandler().listen(
                this._holderElement,
                goog.events.EventType.SCROLL,
                this.onHolderScroll,
                this)
            .listen(
                this._headerInnerWrapper,
                goog.events.EventType.SCROLL,
                this.onHeaderScroll,
                this);
        },

        onHeaderScroll: function(event){
            this._holderElement.scrollLeft = event.target.scrollLeft;
        },
        onHolderScroll: function(event){
            var style = goog.style;
            this._headerInnerWrapper.scrollLeft = event.target.scrollLeft;
        },

        /**
         * Appended a new timeline.
         * @param  {synthjs.ui.sequencer.TimelineBase} timeline [description]
         * @return {null}          [description]
         */
        appendLine: function(timeline){
            // this.getHandler().listen(
            //     timeline,
            //     synthjs.ui.sequencer.TimelineBase.EventType.RESIZE,
            //     this.orderWidth,
            //     this);
            var dom = this.getDomHelper();
            var wrapper = dom.createDom("div");
            dom.appendChild(this._holderElement, wrapper);
            timeline.render(wrapper);
            this._timelines.push({
                wrapper: wrapper,
                component: timeline
            });
            this.orderWidth();//onChangeContentWidth();

        },

        removeLine: function(timeline){
            var newTimelines = [];
            goog.array.forEach(this._timelines, function(e){
                if( e.component!=timeline ){
                    newTimelines.push(e);
                }
                else{
                    this.getDomHelper().removeNode(e.wrapper);
                }
            }, this);
            this._timelines = newTimelines;
        }


    });

});