goog.provide("synthjs.encode.Utility");

goog.require("goog.array");

/**
 * 複数のTypedArrayをjoinする。
 * @param {array} arrayList
 */
synthjs.encode.Utility.TypedArrayJoin = function(arrayList){
	if( arrayList.length==0 ){
		return false;
	}
	
	var constructor = arrayList[0].constructor;
	var totalLength = 0;
	for( var i=0; i<arrayList.length; i++ ){
		totalLength += arrayList[i].length;
	}
	
	var buffer = new constructor(totalLength);
	
	var needle = 0;
	goog.array.forEach(arrayList, function(arr){
		for( var i=0; i<arr.length; i++){
			buffer[needle] = arr[i]; 
			needle ++;
		}
	});
	
	return buffer;
};


/**
 * 複数のTypedArrayをストライプ状にjoinする。
 * @param {array} arrayList
 */
synthjs.encode.Utility.TypedArrayJoinStripe = function(arrayList){
	if( arrayList.length==0 ){
		return false;
	}
	
	var eachLength = arrayList[0].length;
	for(var j=0; j<arrayList.length; j++){
		if( arrayList[j].length!=eachLength ){
			return false;
		}
	}
	
	var constructor = arrayList[0].constructor;
	var totalLength = eachLength * arrayList.length;
	var buffer = new constructor(totalLength);
	
	goog.array.forEach(arrayList, function(arr, cnt){
		for( var i=0; i<arr.length; i++){
			buffer[i*arrayList.length + cnt] = arr[i]; 
		}
	});
	
	return buffer;	
}
