goog.provide("synthjs.application.OscillatorTestPlayer");

goog.require("synthjs.ui.AjaxDialog");
goog.require("synthjs.application.OscillatorPlayer");
goog.require("goog.Uri");


/**
 * @constructor
 * @extends {synthjs.application.OscillatorPlayer}
 */
synthjs.application.OscillatorTestPlayer = function(id, params){
	this._publishUri = new goog.Uri( params['publishUrl'] );
	goog.base(this, id, params);
	
};

goog.inherits(synthjs.application.OscillatorTestPlayer, synthjs.application.OscillatorPlayer);

/**
 * @override
 */
synthjs.application.OscillatorTestPlayer.prototype._getMenuComponent = function(){
	return synthjs.ui.MenuBar.createFromSetting(
		[
			{label:"Menu", sublist: [
				{label:'Publish', callback: goog.bind(this.publishInstrument, this)}
			]}
		]
	); 
}

synthjs.application.OscillatorTestPlayer.prototype.publishInstrument = function(){
	var publishDialog = new synthjs.ui.AjaxDialog("test", this._publishUri);
	publishDialog.setVisible(true);
}


window['OscillatorTestPlayer'] = synthjs.application.OscillatorTestPlayer;