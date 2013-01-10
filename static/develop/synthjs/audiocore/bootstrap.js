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
					//postMessage(controls);
					if( controls ){
						rt.controller.controls = controls;
					}
				}
				// postMessage(rt.controller);
				break;
			case 'sequence':
				var totalLength = 0,
					buffersList = [];
				for( var i=0; i<e.data.sequence.length; i++ ){
					var process = e.data.sequence[i];
					switch(process.action){
						case "set":
							inst.setValue(process.id, process.value);
							break;
						case "midi":
							switch(process.type){
								case "noteon":
									inst.onNote(process.note, process.velocity);
									break;
								case "noteoff":
									inst.offNote(process.note);
									break;
								case "notealloff":
									inst.offAllNote();
									break;
							}
							break;
						case "getbuffer":
							totalLength += process.length;
							buffersList.push(inst.getBuffer(process.length));
							break;
					}
				}

				rt.leftbuffer = new Float32Array(totalLength);
				rt.rightbuffer = new Float32Array(totalLength);
				var needle = 0;
				for( i=0; i<buffersList.length; i++ ){
					for( var j=0; j<buffersList[i][0].length; j++ ){
						rt.leftbuffer[needle] = buffersList[i][0][j];
						rt.rightbuffer[needle] = buffersList[i][1][j];
						needle++;
					}
				}
				break;

			case 'set':
				inst.setValue(e.data.id, e.data.value);
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
						inst.offAllNote();
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
	
		
	
		postMessage(rt);
	});
})();
