addEventListener('message', onGetWave, false);

var sampleRate, currentRadian = 0, freqPerSample = false;

function onGetWave(e) {
	var request = e.data, response = {
		callback : request.callback
	};
	
	switch(request.action) {
		case 'init':
			sampleRate = request.samplerate;
			break;
		case 'midi':
			switch(request.type) {
				case "noteon":
					var freq = 440 * Math.pow(2, (request.note / 12) - 5) * 2 * Math.PI;
					freqPerSample = freq / sampleRate;
					break;
				case "noteoff":
				case "notealloff":
				default:
					freqPerSample = false;
					break;
			}
			break;
		case 'getbuffer':
			var buffer = new Float32Array(request.length);
			if(freqPerSample !== false) {
				for(var i = 0; i < request.length; i++) {
					currentRadian += freqPerSample;
					buffer[i] = Math.sin(currentRadian);
				}
			}
			response.leftbuffer = buffer;
			response.rightbuffer = buffer;
			break;
		default:
			return;
	}

	postMessage(response);
};