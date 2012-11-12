goog.provide("synthjs.ui.Keyboard");
goog.provide("synthjs.ui.KeyboardEventType");

goog.require("goog.ui.Component");
goog.require("synthjs.ui.VerticalKeyboardRenderer");
goog.require("goog.events.EventHandler");
goog.require("goog.events.EventType");
goog.require("synthjs.audiocore.Note")
goog.require("goog.dom.classes");
goog.require("goog.events.BrowserEvent.MouseButton");

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {synthjs.audiocore.Note} lowestNote
 * @param {synthjs.audiocore.Note} highestNote
 * @param {synthjs.ui.VerticalKeyboardRenderer} opt_renderer
 */
synthjs.ui.Keyboard = function(lowestNote, highestNote, opt_renderer, opt_domHelper){
	this._lowestNote = lowestNote;
	this._highestNote = highestNote;
	this._currentActiveElement = null;
	this._currentMouseoverElement = null;
	this._isMouseActive = false;
	this._singingNoteString = null;
	
	this._renderer = opt_renderer ? opt_renderer : synthjs.ui.VerticalKeyboardRenderer.getInstance();
	this._eventHandler = new goog.events.EventHandler();
	goog.base(this, opt_domHelper);
}

goog.inherits(synthjs.ui.Keyboard, goog.ui.Component);

synthjs.ui.Keyboard.prototype.decorateInternal = function(el){
	goog.base(this, "decorateInternal", el);
	this._renderer.decorate(el, this._lowestNote, this._highestNote, this.getDomHelper());
}

synthjs.ui.Keyboard.prototype.enterDocument = function(){
	goog.base(this, "enterDocument");
	var dom = this.getDomHelper();
	var nodes = dom.findNodes(this.getElement(), function(el){
		return goog.dom.classes.has(el, "keyboard-key");
	},this);
	this._keyHash = {};
	goog.array.forEach(nodes, function(node){
		this._keyHash[node['dataset']['note']] = node;
	}, this);
	
	//console.log(this._keyHash);
	
	this._eventHandler.listen(this.getElement(), [
		goog.events.EventType.MOUSEDOWN,
		goog.events.EventType.MOUSEMOVE
	], this.onActivateKey, false, this);
	
	this._eventHandler.listen(this.getElement(), [
		goog.events.EventType.MOUSEUP
	], this.onDeactivateKey, false, this);
	
	this._eventHandler.listen(this.getElement(), [
		goog.events.EventType.MOUSEOUT
	], this.onMouseout, false, this);
	
}

synthjs.ui.Keyboard.prototype.onMouseout = function(e){
	
	if( (e.relatedTarget // If mouse move out browser window, e.relatedTarget is Null. 
				&& !goog.dom.contains(this.getElement(), e.relatedTarget)) // mouseout to outer element
			|| e.relatedTarget == this.getElement() // mouseout to scrollbar 
		){
	
		if( this._currentActiveElement ){
			this._dispatchNoteEvent(this._currentActiveElement['dataset']['note'], synthjs.ui.KeyboardEventType.OFF);
		}
		this._currentActiveElement = null;
		
		if( this._currentMouseoverElement ){
			goog.dom.classes.remove( this._currentMouseoverElement, "mouseover" );
		}
		this._currentMouseoverElement = null;
		
		this._isMouseActive = false;
	}
}

synthjs.ui.Keyboard.prototype.onDeactivateKey = function(e){
	e.preventDefault();
	this._isMouseActive = false;
	this._currentActiveElement = null;
	var browser_event = e.getBrowserEvent();
	
	if( e.target['dataset']['note'] ){
		this._dispatchNoteEvent(e.target['dataset']['note'], synthjs.ui.KeyboardEventType.OFF);
	}
};

synthjs.ui.Keyboard.prototype.onActivateKey = function(e){
	e.preventDefault();
	
	if( e.type == goog.events.EventType.MOUSEDOWN ){
		this._isMouseActive = true;
	}
	
	var browser_event = e.getBrowserEvent();
	if( e.target['dataset']['note'] ){
		if( this._isMouseActive ){
			
			if( this._currentActiveElement != e.target ){
				if( this._currentActiveElement ){
					this._dispatchNoteEvent(
						this._currentActiveElement['dataset']['note'], 
						synthjs.ui.KeyboardEventType.OFF);
				}
				
				this._dispatchNoteEvent(e.target['dataset']['note'], synthjs.ui.KeyboardEventType.ON);
				this._currentActiveElement = e.target;
			}
		}
		
		if( this._currentMouseoverElement != e.target ){
			if( this._currentMouseoverElement ){
				goog.dom.classes.remove( this._currentMouseoverElement, "mouseover" );
			}
			this._currentMouseoverElement = e.target;
			goog.dom.classes.add( this._currentMouseoverElement, "mouseover" );
		}
	}
}

/**
 * @param {number} noteNum c4=60 in midi format
 */
synthjs.ui.Keyboard.prototype.markKey = function(noteNum){
	if( !goog.isNull(this._keyHash[noteNum]) ){
		goog.dom.classes.add( this._keyHash[noteNum], "mouseover" );
	}
}

/**
 * @param {number} noteNum c4=60 in midi format
 */
synthjs.ui.Keyboard.prototype.demarkKey = function(noteNum){
	if( !goog.isNull(this._keyHash[noteNum]) ){
		goog.dom.classes.remove( this._keyHash[noteNum], "mouseover" );
	}	
}

synthjs.ui.Keyboard.prototype._dispatchNoteEvent = function(noteString, eventType){
	
	if( this._singingNoteString && eventType==synthjs.ui.KeyboardEventType.ON ){
		this._dispatchNoteEvent(this._singingNoteString, synthjs.ui.KeyboardEventType.OFF);
	}
	
	var event = new goog.events.Event(eventType, {note: synthjs.audiocore.Note.createByMidiFormat(noteString)});
	//event.note = synthjs.audiocore.Note.createByString(noteString);
	//event.note = synthjs.audiocore.Note.createByMidiFormat(noteString);
	this.dispatchEvent(event);
	if( eventType == synthjs.ui.KeyboardEventType.ON ){
		this._singingNoteString = noteString;
	}
}

synthjs.ui.KeyboardEventType = {
	ON: "keyboard-on",
	OFF: "keyboard-off"
}
