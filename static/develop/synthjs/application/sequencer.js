goog.provide("synthjs.application.Sequencer");

goog.require("synthjs.application.Base");
goog.require("synthjs.ui.SequencerContainer");



goog.scope(function(){


var Sequencer = synthjs.application.Sequencer = function(id){
    goog.base(this, id);
};

goog.inherits(Sequencer, synthjs.application.Base);

Sequencer.prototype._init = function(){

};

Sequencer.prototype._getMenuComponent = function(){
    return synthjs.ui.MenuBar.createFromSetting(
        [
            {label:"File", sublist: [
                {label:'Save', callback: function(){}},
                {label:'Import', callback: function(){}},
                {label:'Exort', callback: function(){}}
            ]}
        ]
    ); 
};

Sequencer.prototype._getBodyComponent = function(){
    return new synthjs.ui.SequencerContainer();
};


});