goog.provide("synthjs.bridge.PNGlib");

synthjs.bridge.PNGlib = function(w,h,d){
    goog.asserts.assertFunction(PNGlib);
    this._pnglib = new PNGlib(w,h,d);
    this.buffer = this._pnglib.buffer;
};

synthjs.bridge.PNGlib.prototype.index = function(x,y){
    return this._pnglib['index'](x, y);
};

synthjs.bridge.PNGlib.prototype.color = function(r,g,b,a){
    return this._pnglib['color'](r,g,b,a);
};

synthjs.bridge.PNGlib.prototype.getBase64 = function(){
    return this._pnglib['getBase64']();
};

synthjs.bridge.PNGlib.prototype.getDump = function(){
    return this._pnglib['getDump']();
};

