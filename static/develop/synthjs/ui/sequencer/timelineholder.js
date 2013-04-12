goog.provide("synthjs.ui.sequencer.TimelineHolder");

goog.require("synthjs.ui.sequencer.TimelineHeader");
goog.require("goog.ui.Component");

goog.scope(function(){

    var TimelineHolder = synthjs.ui.sequencer.TimelineHolder = function(delta, opt_domHelper){
        goog.base(this, opt_domHelper);
        this._headerHeight = null;
        this._headerScrollbarMargin = 30;
        this._innerWidth = null;
        this._width = null;
        this._timelines = [];
        this._headerComponent = null;
        this._needle = null;
        this._needleOffset = 0;
        this._scrollLeft = 0;
        this._delta = delta;
        this._tick = 50;
        this._scrollMargin = 500;

        /**
         * Unit of pixel
         * @type {Number}
         */
        this._offsetDisplayFrom = 0;
        this._offsetDisplayTo = 0;
        this._marginDisplay = 2000;
    };

    goog.inherits(TimelineHolder, goog.ui.Component);

    goog.object.extend(TimelineHolder, {
        _ROOT_CLASSNAME: "timeline-holder",
        _HEADER_CLASSNAME: "timeline-holder-header",
        _HEADER_INNERWRAPPER_CLASSNAME: "timeline-holder-header-innerwrapper",
        _HOLDER_CLASSNAME: "timeline-holder-holder",
        _NEEDLE_CLASSNAME: "timeline-needle"
    });

    goog.object.extend(TimelineHolder.prototype, {
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
            this._setTimelineDisplay();
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
        onResize: function(){
            var style = goog.style;
            style.setHeight(this._holderElement,
                style.getBorderBoxSize(this.getElement()).height - this._headerHeight
            );
        },
        orderWidth: function(){
            var style = goog.style,
                size,
                width = this._width = style.getBorderBoxSize(this.getElement()).width;

            goog.array.forEach(this._timelines, function(timeline){
                size = style.getBorderBoxSize(timeline.component.getElement());
                if( width < timeline.component.getWidth() ){ //size.width ){
                    width = timeline.component.getWidth();//size.width;
                }
            });
            this._innerWidth = width;
            this._headerComponent.setWidth( width );
            goog.array.forEach(this._timelines, function(e){
                e.component.setWidth(width, true);
            });
        },
        setNeedleOffset: function(offset){
            this._needleOffset = offset / this._delta * this._tick;
            this.drawNeedle();
        },
        drawNeedle: function(){
            var margin = Math.min(this._width/2, this._scrollMargin);
            if( this._needleOffset < this._scrollLeft ){
                // this._scrollLeft = this._needleOffse - margin;
                if( this.setScroll(this._needleOffse - margin) ){
                    this.scrollHeader();
                    this.scrollHolder();
                }
            }
            else if( this._scrollLeft + this._width < this._needleOffset ) {
                if( this.setScroll(this._needleOffset + margin - this._width) ){
                    this.scrollHeader();
                    this.scrollHolder();
                }
                // this._scrollLeft = this._needleOffset + margin - this._width;
                // this.scrollHeader();
                // this.scrollHolder();
            }
            goog.style.setStyle(this._needle, {
                left: (this._needleOffset - this._scrollLeft) + 'px'
            });
        },

        setScroll: function(scroll){
            scroll = parseInt(scroll, 10);
            if( this._scrollLeft != scroll ){
                this._scrollLeft = scroll;
                this._setTimelineDisplay();

                return true;
            }
            return false;
        },
        _setTimelineDisplay: function(){
            // console.log('======');
            // console.log("scrollLeft="+this._scrollLeft+"; typeof="+typeof(this._scrollLeft));
            // console.log("offsetDisplayFrom="+this._offsetDisplayFrom+"; typeof="+typeof(this._offsetDisplayFrom));
            // console.log("offsetDisplayTo="+this._offsetDisplayTo+"; typeof="+typeof(this._offsetDisplayTo));
            // console.log("width="+this._width+"; typeof="+typeof(this._width));
            // console.log(this._scrollLeft <= this._offsetDisplayFrom ||
            //     this._offsetDisplayTo <= this._scrollLeft + this._width);
            if( this._scrollLeft <= this._offsetDisplayFrom ||
                this._offsetDisplayTo <= this._scrollLeft + this._width )
            {
                console.log('setTimelineDisplay');
                this._offsetDisplayFrom = this._scrollLeft - this._marginDisplay;
                this._offsetDisplayTo = this._scrollLeft + this._width + this._marginDisplay;

                goog.array.forEach(this._timelines, function(timeline){
                    timeline.component.showEvents(this._offsetDisplayFrom, this._offsetDisplayTo);
                },this);

            }
        },
        onHeaderScroll: function(event){
            // if( this._scrollLeft != event.target.scrollLeft ){
            //     this._scrollLeft = event.target.scrollLeft;
            if( this.setScroll(event.target.scrollLeft) ){
                this.scrollHolder();
            }
        },
        scrollHeader: function(){
            if( this._headerInnerWrapper ){
                this._headerInnerWrapper.scrollLeft = this._scrollLeft;
            }
            // this.onScroll();
        },
        onHolderScroll: function(event){
            // if( this._scrollLeft != event.target.scrollLeft ){
            //     this._scrollLeft = event.target.scrollLeft;
            if( this.setScroll(event.target.scrollLeft) ){
                this.scrollHeader();
            }
        },
        scrollHolder: function(){
            if( this._holderElement ){
                this._holderElement.scrollLeft = this._scrollLeft;
            }
            // this.onScroll();
        },
        onScroll: function(){
            console.trace();
            console.log('hoge');
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
            timeline.showEvents(this._offsetDisplayFrom, this._offsetDisplayTo);
            // this._setTimelineDisplay();
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