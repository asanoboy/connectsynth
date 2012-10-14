addEventListener('message', onFilter, false);

function onFilter(e){
	var callback = e.data.callback;
	
	for(var i=0; i<e.data.leftBuffer.length; i++){
		e.data.leftBuffer[i] /= 2;
		e.data.rightBuffer[i] /= 2;
	}
	
	postMessage({
		leftBuffer: e.data.leftBuffer, 
		rightBuffer: e.data.rightBuffer,
		callback:callback
	});
};
