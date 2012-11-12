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
		$whiteKeyboard = $("div"), 
		$blackKeyboard = $("div"),
		currentNote = highestNote,
		totalWhiteWidth = borderWidth,
		whiteWidth, $key;
	
	addClass($wrapper, 'keyboard-wrapper');
	addStyle($wrapper, 'position', 'relative');
	addClass($whiteKeyboard, 'white-keyboard');
	addClass($blackKeyboard, 'black-keyboard');
	
	while( currentNote.freq >= lowestNote.freq  ){
		$key = $('div');
		domHelper.setProperties($key, {"data-note": currentNote.getMidiNum()});
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
			
		    
			$whiteKeyboard.appendChild($key);
			totalWhiteWidth += whiteWidth+borderWidth;
		}
		else {
		    
		 	addStyle($key, {
				position:'absolute', 
				top: totalWhiteWidth-0.5*eachWidth-borderWidth+'px'
			});
			$blackKeyboard.appendChild($key);
		}
		
        if( currentNote.freq === highestNote.freq ){
        	addClass($key, "top");
        }
		
		addClass($key, "keyboard-key");
		if( currentNote.freq === highestNote.freq ){
            addClass($key, "first-key");
        }
        
		currentNote = currentNote.getNext(false);
	}
	
	$wrapper.appendChild($whiteKeyboard);
	$wrapper.appendChild($blackKeyboard);
		
}
