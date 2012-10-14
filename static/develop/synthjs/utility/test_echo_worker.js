addEventListener('message', onMessage, false);

function onMessage(e){
	postMessage(e.data);
}