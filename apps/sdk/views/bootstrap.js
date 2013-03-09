importScripts("main.js");

(function(){
	var inst = new Instrument();
	addEventListener('message', function(e){
		var rt = {callback: e.data.callback};
		switch(e.data.action) {
			case 'init':
				inst.setSampleRate(e.data.samplerate);
				var background = inst.getBackground && typeof(inst.getBackground)=='function' ? 
					inst.getBackground() :
					false;
				
				if( background ){
					rt.controller = {background: background};
					
					var controls = inst.getControlList && typeof(inst.getControlList)=='function' ?
						inst.getControlList() :
						false;
					if( controls ){
						rt.controller.controls = controls;
					}
				}
				break;
			case 'set':
				inst.setValue(e.data.id, e.data.value)
				break;
			case 'midi':
				switch(e.data.type){
					case "noteon":
						inst.onNote(e.data.note, e.data.velocity);
						break;
					case "noteoff":
						inst.offNote(e.data.note);
						break;
					case "notealloff":
						inst.offAllNote()
						break;
				}
				break;
			case 'getbuffer':
				var bufferPair = inst.getBuffer(e.data.length);
				rt.leftbuffer = bufferPair[0];
				rt.rightbuffer = bufferPair[1];
				break;
			default:
				return;
		}
	
		// delete rt.callback;	
	
		postMessage(rt);
	});
})();	
