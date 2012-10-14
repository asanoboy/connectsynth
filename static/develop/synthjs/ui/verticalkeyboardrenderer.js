goog.provide("synthjs.ui.VerticalKeyboardRenderer");

goog.require("goog.dom.classes");
goog.require("goog.style");

/**
 * @constructor
 */
synthjs.ui.VerticalKeyboardRenderer = function(){
	
}

goog.addSingletonGetter(synthjs.ui.VerticalKeyboardRenderer);

synthjs.ui.VerticalKeyboardRenderer.CLASS_NAME_ = goog.getCssName("ui-vertical-keyboard");

synthjs.ui.VerticalKeyboardRenderer.prototype.decorate = function(element, 
	lowestNote, highestNote, domHelper){
	
	var borderWidth = 1,
		eachWidth = 10;
	
	var $wrapper = element,
		$ = goog.bind(domHelper.createDom, domHelper),
		addClass = goog.dom.classes.add,
		addStyle = goog.style.setStyle,
		$whiteKeybord = $("div"), 
		$blackKeybord = $("div"),
		currentNote = highestNote,
		totalWhiteWidth = borderWidth,
		whiteWidth, $key;
	
	addClass($wrapper, 'keybord-wrapper');
	addStyle($wrapper, 'position', 'relative');
	addClass($whiteKeybord, 'white-keybord');
	addClass($blackKeybord, 'black-keybord');
	
	while( currentNote.freq >= lowestNote.freq  ){
		$key = $('div');
		domHelper.setProperties($key, {"data-note": currentNote.getString()});
		if( currentNote.isWhite ){
			if( currentNote.freq==highestNote.freq && 'cdfga'.indexOf(currentNote.note, 0)!==-1 ){
				whiteWidth = eachWidth-borderWidth;
				addClass($key, "edge_short");
			}
			else if( currentNote.freq==lowestNote.freq && 'degab'.indexOf(currentNote.note, 0)!==-1 ){
				whiteWidth = eachWidth-borderWidth;
				addClass($key, "edge_short");
			}
			else if( 'dga'.indexOf(currentNote.note, 0)!==-1 ){
				whiteWidth =  2*eachWidth-borderWidth;
				addClass($key, "long");
			}
			else {
				whiteWidth = 1.5*eachWidth-borderWidth;
				addClass($key, "short");
			}
			
		    
			$whiteKeybord.appendChild($key);
			totalWhiteWidth += whiteWidth+borderWidth;
		}
		else {
		    
		 	addStyle($key, {
				position:'absolute', 
				top: totalWhiteWidth-0.5*eachWidth-borderWidth+'px'
			});
			$blackKeybord.appendChild($key);
		}
		
        if( currentNote.freq === highestNote.freq ){
        	addClass($key, "top");
        }
		
		addClass($key, "keybord-key");
		if( currentNote.freq === highestNote.freq ){
            addClass($key, "first-key");
        }
        
		currentNote = currentNote.getNext(false);
	}
	
	$wrapper.appendChild($whiteKeybord);
	$wrapper.appendChild($blackKeybord);
		
}
