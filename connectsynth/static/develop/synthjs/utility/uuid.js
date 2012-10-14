goog.provide("synthjs.utility.UUID");


synthjs.utility.UUID = {}

synthjs.utility.UUID.create = function(){
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1) + '_' +
		(((1+Math.random())*0x10000)|0).toString(16).substring(1) + '_' + 
		(((1+Math.random())*0x10000)|0).toString(16).substring(1) + '_' +
		(((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
