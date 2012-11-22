goog.provide("synthjs.ui.PluginControlPanelContainer");

goog.require("goog.ui.Component");
goog.require("goog.ui.ComboBox");
goog.require("goog.ui.ComboBoxItem");
goog.require("synthjs.ui.PluginControlPanel");

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {synthjs.ui.PluginControlPanel} controlpanel
 */
synthjs.ui.PluginControlPanelContainer = function(controlpanel, opt_isEditable, opt_domHelper){
	goog.base(this, opt_domHelper);
	this._controlPanel = controlpanel;
	this._isEditable = goog.isNull(opt_isEditable) ? false : !!opt_isEditable;
}

goog.inherits(synthjs.ui.PluginControlPanelContainer, goog.ui.Component);


synthjs.ui.PluginControlPanelContainer.prototype.decorateInternal = function(element){
	goog.base(this, "decorateInternal", element);
	
	var dom = this.getDomHelper();
	this._wrapper = dom.createDom("div");
	this._header = dom.createDom("div", "plugincontrol-header");
	this._presetSelector = dom.createDom("div", "plugincontrol-header-preset");
	dom.appendChild( this._header, this._presetSelector );
	goog.style.setFloat(this._presetSelector, 'right');	 
	goog.style.setStyle(this._header, {
		width: this._controlPanel.getBackgroundWidth() + "px",
		position: 'absolute',
		top: '70px'
	});	 
	dom.appendChild( this._presetSelector, dom.createDom("span", "", "preset: "));
	
	if( this._isEditable ){
		this._controlWrapper = dom.createDom("div");
		this._addButton = dom.createDom("a", 'add-btn' , "add");
		this._deleteButton = dom.createDom("a", 'delete-btn', "delete");
		
		//dom.appendChild(this._controlWrapper, this._addButton);
		//dom.appendChild(this._controlWrapper, this._deleteButton);
		dom.appendChild(this._presetSelector, this._addButton);
		dom.appendChild(this._presetSelector, this._deleteButton);
		dom.appendChild(this._header, this._controlWrapper);
		goog.style.setStyle(this._controlWrapper, {
			
		});
	}
	
	this._panel = dom.createDom("div");
	dom.appendChild(this._wrapper, this._panel);
	dom.appendChild(this._wrapper, this._header);
	
	this._controlPanel.decorate(this._panel);
	dom.appendChild(element, this._wrapper);

	goog.style.setStyle(element, {
		position: 'relative'
	});
	goog.style.setStyle(this._panel, {
		position: 'absolute',
		top: '100px'
	});

};

synthjs.ui.PluginControlPanelContainer.prototype.enterDocument = function(){
	goog.base(this, 'enterDocument');
	
	if( this._isEditable ){
		this.getHandler().listen(
				this._addButton,
				goog.events.EventType.CLICK,
				this.onPresetAdd
			)
			.listen(
				this._deleteButton,
				goog.events.EventType.CLICK,
				this.onPresetDelete
			);
	}
};
synthjs.ui.PluginControlPanelContainer.prototype.resize = function(){
	//this._controlPanel.resize();
	
	var size = goog.style.getContentBoxSize( this.getElement() );
	var dom = this.getDomHelper();
	var left = (size.width - this._controlPanel.getBackgroundWidth())/2;
	if( left<0 ){
		left = 0;	
	}
	goog.style.setStyle(this._panel, {
		left: left+"px"
	});
	
	goog.style.setStyle(this._header, {
		left: left+"px"
	});
}

synthjs.ui.PluginControlPanelContainer.prototype.onPresetDelete = function(e){
	this.dispatchPresetEvent(synthjs.ui.PluginControlPanelContainer.EventType.PRESET_DELETE);
}
synthjs.ui.PluginControlPanelContainer.prototype.onPresetAdd = function(e){
	this.dispatchPresetEvent(synthjs.ui.PluginControlPanelContainer.EventType.PRESET_ADD);
}
synthjs.ui.PluginControlPanelContainer.prototype.onPresetChange = function(e){
	this.dispatchPresetEvent(synthjs.ui.PluginControlPanelContainer.EventType.PRESET_CHANGE);
}

synthjs.ui.PluginControlPanelContainer.prototype.dispatchPresetEvent = function(type){
	var selected = this.getDomHelper().findNode(this._presetComboBox, function(e, i){
		return e.selected;
	});
	
	if( type == synthjs.ui.PluginControlPanelContainer.EventType.PRESET_ADD ){
		var event = new goog.events.Event(type);
	}
	else {
		if( !selected || !selected.value ){
			return false;
		}
		var event = new goog.events.Event(type,
			selected.value);
	}
	
	this.dispatchEvent(event);
}

/**
 * @param {synthjs.model.Collection} presetCollection
 * @param {string=} opt_presetCode The code of initial preset.
 */
synthjs.ui.PluginControlPanelContainer.prototype.updatePresets = function(presetCollection, opt_presetCode){
	var dom = this.getDomHelper();
	if( this._presetComboBox ){
		dom.removeNode( this._presetComboBox );
		this.getHandler().unlisten(this._presetComboBox);
		this._presetComboBox = null;
	}
	
	this._presetComboBox = dom.createDom("select");
	dom.appendChild(this._presetComboBox, dom.createDom("option", {value: ""}, "select preset.."))
	var exist = true;//false;
	goog.array.forEach(presetCollection.getAll(), function(preset){
		exist = true;
		var attr = {'value': preset.get('code')};
		if( preset.get('code')==opt_presetCode ){
			attr['selected'] = 'selected';
		}
		dom.appendChild(this._presetComboBox, dom.createDom("option", attr, preset.get('name')))
	}, this);
	
	if( !exist ){
		return;
	}
	
	this.getHandler().listen(
		this._presetComboBox,
		goog.events.EventType.CHANGE,
		this.onPresetChange
	)
	//this._presetSelector = dom.createDom("div", 'hoge', 'pre');
	//this._presetComboBox.render(this._presetSelector);
	dom.appendChild(this._presetSelector, this._presetComboBox);
}

synthjs.ui.PluginControlPanelContainer.EventType = {
	PRESET_CHANGE: 'preset_change',
	PRESET_ADD: 'preset_add',
	PRESET_DELETE: 'preset_delete'
};
