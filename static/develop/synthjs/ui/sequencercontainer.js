goog.provide("synthjs.ui.SequencerContainer");

goog.require("goog.ui.Component");
goog.require("goog.object");
goog.require('goog.fx.AnimationQueue');
goog.require('goog.fx.dom');
goog.require("goog.fx");


goog.scope(function(){

var createDom = goog.dom.createDom,
    style = goog.style,
    classes = goog.dom.classes,
    AnimationParallelQueue = goog.fx.AnimationParallelQueue;

var Container = synthjs.ui.SequencerContainer = function(opt_domHelper){
    goog.base(this, opt_domHelper);
    this._slideWidth = 100;
    this._slideDuration = 1000;
};

goog.inherits(Container, goog.ui.Component);

goog.object.extend(Container, {
    WRAPPER_CLASSNAME: 'sequencer-container-wrapper',
    SLIDEBODY_CLASSNAME: 'sequencer-container-slidebody',
    LEFTPANE_CLASSNAME: 'sequencer-container-liftpane'

});


goog.object.extend(Container.prototype, {
    // decorateInternal: function(elem){
    //     goog.base(this, "decorateInternal", elem);
    //     goog.dom.appendChild(elem, goog.dom.createDom(
    //         "div", 
    //         'hoge'));

    // },

    createDom: function(){
        var elem = createDom('div', Container.WRAPPER_CLASSNAME);

        this._body = createDom('div', 
            Container.SLIDEBODY_CLASSNAME);
        style.setStyle(this._body,
            {
                "position": 'absolute',
                "z-index": 10,
                'background-color': 'red'
            });
        
        this._leftpane = createDom('div', 
            Container.LEFTPANE_CLASSNAME);

        style.setStyle(this._leftpane,
            {
                "position": 'absolute',
                'background-color': 'blue'
            });
        var dom = this.getDomHelper();

        dom.appendChild(elem, this._leftpane);
        dom.appendChild(elem, this._body);

        this.setElementInternal(elem);
    },

    enterDocument: function(){
        goog.base(this, 'enterDocument');
        setTimeout(goog.bind(function(){
            this.open();
        }, this), 1000) ;
    },

    disposeInternal: function(){

    },

    open: function(){
        this.slide(true);
    },
    close: function(){
        this.slide(false);
    },
    slide: function(isOpen){
        var animation = new AnimationParallelQueue();
        var pos = style.getPosition(this._body);
        var bodyBoxSize = style.getBorderBoxSize(this._body);

        var posClosed = [pos.x, pos.y],
            posOpened = [pos.x = this._slideWidth, pos.y],
            sizeClosed = [bodyBoxSize.width, bodyBoxSize.height],
            sizeOpened = [bodyBoxSize.width-this._slideWidth, bodyBoxSize.height];


        animation.add(new goog.fx.dom.Slide(this._body, 
            isOpen ? posClosed : posOpened,
            isOpen ? posOpened : posClosed,
            this._slideDuration,
            goog.fx.easing.easeOut));

        animation.add(new goog.fx.dom.Resize(this._body,
            isOpen ? sizeClosed : sizeOpened,
            isOpen ? sizeOpened : sizeClosed,
            this._slideDuration,
            goog.fx.easing.easeOut
            ));
        animation.play();
    },
    
    setLeftPane: function(component){
        var dom = this.getDomHelper();

        if( !component.getElement() ){
            component.createDom();
        }
        this._leftpaneComponent = component;
        dom.removeChildren(this._leftpane);
        dom.appendChild(this._leftpane, component.getElement());
    },

    onResize: function(size){

        style.setBorderBoxSize(
            this.getElement(),
            size);
        style.setBorderBoxSize(
            this._body, size);
        style.setBorderBoxSize(
            this._leftpane, size);
    }
});


});