goog.provide("synthjs.application.Sequencer");

goog.require("synthjs.application.Base");


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
    return synthjs.ui.MenuBar.createFromSetting(
        [
            {label:"Control", sublist: [
                {label:'Copy To Workspace', callback: function(){}},
                {label:'About', callback: function(){}}
            ]}
        ]
    ); 
};


});