addEventListener('message', onMessage, false);

function onMessage(e){
	throw new Error("test");
	postMessage(e.data);
}