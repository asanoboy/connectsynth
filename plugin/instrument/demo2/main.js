addEventListener('message', onGetWave, false);

var sampleRate, currentRadian = 0, freqPerSample = false, targetFreqPerSample = false, glideFreqPerSample = false, lastFreqPerSample = false, glideSecond = 0.05, glideRangeSecond = 0.01, oscillator=Math.sin, volume=0.5, glide=0, removedAt=0;

function onGetWave(e) {
	var request = e.data, response = {
		callback : request.callback
	};
	
	switch(request.action) {
		case 'init':
			sampleRate = request.samplerate;
			
			response.controller = {
				background: {
					image: 'background.png',
					height: 400,
					width: 500
				},
				controls: [
					{
						type: "control",
						id: "volume",
						value: volume,
						height: 50,
						width: 50,
						image: 'volume.png',
						min: 0, max: 1, step: 0.001, offsetx: 100, offsety:100
					},
					{
						type: "radio",
						id: "oscillator",
						height: 50,
						width: 50,
						value: 0,
						imageon: "oscillator.png",
						imageoff: "oscillator.png",
						offsets: [
							{
								offsetx: 100,
								offsety: 200,
							},
							{
								offsetx: 200,
								offsety: 200,
							},
							{
								offsetx: 300,
								offsety: 200,
							},
							{
								offsetx: 400,
								offsety: 200,
							}
						]
					},
					{
						type: "toggle",
						id: "glide",
						height: 50, 
						width: 50, 
						value: glide,
						imageon: "glide.png",
						imageoff: "glide.png",
						offsetx: 200,
						offsety: 300 
						
					}
				]
			};
			
			break;
		case 'midi':
			switch(request.type) {
				case "noteon":
					var freq = 440 * Math.pow(2, (request.note / 12) - 5) * 2 * Math.PI;
					targetFreqPerSample = freq / sampleRate;
					if( glide && removedAt < glideRangeSecond*sampleRate && lastFreqPerSample ){
						glideFreqPerSample = (targetFreqPerSample - lastFreqPerSample) / (glideSecond * sampleRate);
						freqPerSample = lastFreqPerSample; 
					}
					else {
						freqPerSample = targetFreqPerSample;
					}
					
					break;
				case "noteoff":
				case "notealloff":
				default:
					if( freqPerSample ){
						removedAt = 0;
					}
					lastFreqPerSample = freqPerSample || lastFreqPerSample;
					targetFreqPerSample = false;
					freqPerSample = false;
					glideFreqPerSample = false;
					
					
					break;
			}
			break;
		case 'set':
			if( request.id == 'oscillator' ){
				switch(request.value){
					case 0:
						oscillator=Math.sin;
						break;
					case 1:
						oscillator=triangle;
						break;
					case 2:
						oscillator=square;
						break;
					case 3:
						oscillator=sawtooth;
						break;
				}
			}
			else if( request.id == 'volume' ){
				volume = request.value; 
			}
			else if( request.id == 'glide' ){
				glide = request.value;
			}
			break;
		case 'getbuffer':
			var buffer = new Float32Array(request.length);
			if(freqPerSample !== false) {
				for(var i = 0; i < request.length; i++) {
					currentRadian += freqPerSample;
					if( glide ){
						if( (freqPerSample-targetFreqPerSample)*(freqPerSample+glideFreqPerSample-targetFreqPerSample)<0 ) {
							freqPerSample = targetFreqPerSample;
							glideFreqPerSample = 0;
						}
						else {
							freqPerSample += glideFreqPerSample;
						}
						
					}
					buffer[i] = volume*oscillator(currentRadian);
				}
			}
			else {
				removedAt += request.length;
			}
			response.leftbuffer = buffer;
			response.rightbuffer = buffer;
			break;
		default:
			return;
	}

	postMessage(response);
};

function square(rad){
	rad = rad%(2*Math.PI);
	if( rad<0 ) rad += (2*Math.PI);
	
	if( rad<Math.PI ){
		return 1;
	}
	else {
		return -1;
	}
}

function triangle(rad){
	rad = rad%(2*Math.PI);
	if( rad<0 ) rad += (2*Math.PI);
	
	var grad = 1/(Math.PI/2);
	if( rad<Math.PI/2 ){
		return rad*grad;
	}
	else if( rad<3*Math.PI/2 ){
		return 2-rad*grad;
	}
	else {
		return -4+rad*grad;
	}
}

function sawtooth(rad){
	rad = rad%(2*Math.PI);
	if( rad<0 ) rad += (2*Math.PI);
	
	var grad = 1/Math.PI;
	if( rad<Math.PI ){
		return rad*grad;
	}
	else {
		return -2+rad*grad;
	}
}
