importScripts("controller.js");
importScripts("operator.js");
importScripts("operatorcontroller.js");

addEventListener('message', onGetWave, false);

function onGetWave(e) {
	var rt = {};

	switch(e.data.action) {
		case 'init':
			wave.setSampleRate(e.data.samplerate);
			
			rt.controller = controller;
			
			break;
		case 'set':
			
			var id = e.data.id;
			var value = e.data.value;
			var mat, opeIndex, suffix;
			
			if( (mat=id.match(/^ope([\d]+)_([a-z]+)$/)) ){
				var opeIndex = mat[1];
				var suffix = mat[2];
				switch(suffix){
					case 'a':
					case 'd':
					case 's':
					case 'r':
						wave.setOperatorEnvelope(opeIndex, suffix, value);
						break;
					case 'oct':
						wave.setOperatorOctave(opeIndex, value);
						break;
					case 'fac':
						wave.setOperatorFactor(opeIndex, value);
				}
			}
			else if( (mat=id.match(/^car([\d]+)_(mod([\d]+)|out)$/)) ){
				switch(mat[2]){
					case 'out':
						wave.setOutput(mat[1], value);
						break;
					case 'mod0':
					case 'mod1':
					case 'mod2':
					case 'mod3':
						wave.setParameter(mat[1], mat[3], value);
						break;
				}
			}
			
			break;
		case 'midi':
			wave.addEvent(e.data.type, e.data.note, e.data.velocity);
			break;
		case 'getbuffer':
			var buffer = wave.getBuffer(e.data.length);
			rt.leftbuffer = buffer;
			rt.rightbuffer = new Float32Array(buffer);
			break;
		default:
			return;
	}

	rt.callback = e.data.callback;

	postMessage(rt);
};


var wave = new OperatorController();
