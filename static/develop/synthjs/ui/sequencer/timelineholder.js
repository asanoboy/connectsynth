goog.provide("synthjs.ui.sequencer.TimelineHolder");

goog.require("goog.ui.Component");

goog.scope(function(){

    var TimelineHolder = synthjs.ui.sequencer.TimelineHolder = function(opt_domHelper){
        goog.base(this, opt_domHelper);
    };

    goog.inherits(TimelineHolder, goog.ui.Component);

    goog.object.extend(TimelineHolder.prototype, {

        onResize: function(){

        },
        createDom: function(){
            this.setElementInternal(this.getDomHelper().createDom('div', 'hoge'));
            console.log(this.getElement());
            // this.decorateInternal(this.getElement());
        },
        decorateInternal: function(element){
            goog.base(this, "decorateInternal", element);
        },
        enterDocument: function(){

        },

        appendLine: function(element){

        }


    });

});