function Instrument(){
    this.sampleRate = null;
    this.delaySamples = false;
    this.lpFilter = [1];
    this.maxFilterLength = 25;
    this.cutoff = 480;
}

Instrument.prototype.setSampleRate = function(sampleRate){
    this.sampleRate = sampleRate;
    this.lpfCreator = new LPFCreator(sampleRate);
    this.lpFilter = this.lpfCreator.create(4400, 25);

};

Instrument.prototype.onNote = function(note){
    var freq = 440 * Math.pow(2, (note / 12) - 5);
    this.delaySamples = parseInt(this.sampleRate / freq, 10);
    this.delayBuffer = new DelayBuffer(this.delaySamples * 2);
    this.offsetSamples = 0;
    this.setLPF(this.cutoff);
};

Instrument.prototype.offNote = 
Instrument.prototype.offAllNote = function(){
    this.delaySamples = false;
    this.delayBuffer = false;
    this.offsetSamples = 0;
};

Instrument.prototype.getBuffer = function(length){
    var buffer = new Float32Array(length), val;
    if( this.delaySamples ){
        for( var i=0; i<length; i++){
            if( i+this.offsetSamples < this.delaySamples ){
                val = Math.random()*2-1;
            }
            else {
                // val = this.delayBuffer.applyFilter(this.lpFilter, this.delaySamples);
                val = this.delayBuffer.getFilteredValue(this.delaySamples);
            }
            buffer[i] = val;
            this.delayBuffer.push(val);
            this.delayBuffer.next();
        }
    }
    this.offsetSamples += length;
    return [buffer, buffer];    
};

Instrument.prototype.setValue = function(name, value){
    if( name=='volume' ){
        this.cutoff = value;

    }
};

Instrument.prototype.getBackground = function(){
    return {
        image: 'img/background.png',
        height: 248,
        width: 360
    };
};

Instrument.prototype.getControlList = function(){
    return [
        {
            type : "knob",
            id : "volume",
            value : 0.5,
            height : 120,
            width : 120,
            image : 'img/volume.png',
            min : 0,
            max : 4400,
            step : 0.001,
            offsetx : 56,
            offsety : 95
        } 
    ];
};

Instrument.prototype.setLPF = function(cutoff){
    if( this.delayBuffer ){
        this.delayBuffer.setFilter(
            this.lpfCreator.create(cutoff, this.maxFilterLength),
            this.delaySamples);
    }
}

function DelayBuffer(length){
    this.buffer = new Float32Array(length);
    this.length = length;
    this.needle = 0;
    this.filter = [1];
}

DelayBuffer.prototype.push = function(val){
    this.buffer[this.needle] = val;
};

DelayBuffer.prototype.next = function(){
    this.needle++;
    if( this.needle >= this.length ){
        this.needle -= this.length;
    }
};

DelayBuffer.prototype.getBefore = function(offset){
    var index = this.needle - offset;
    while(index<0){
        index += this.length;
    }
    return this.buffer[index];
};

DelayBuffer.prototype.getFilteredValue = function(offset){
    return this.applyFilteredValue(this.filter, offset);
};

DelayBuffer.prototype.setFilter = function(filter, offset){
    var val = 0, 
        centerIndex = parseInt( (filter.length+1)/2, 10),
        filterRadius = filter.length-centerIndex,
        validFilterRadius = Math.min(filterRadius, this.length-offset, offset),
        filterStart = centerIndex - validFilterRadius -1,
        filterEnd = centerIndex + validFilterRadius;
    this.filter = [];
    var sum = 0;
    for(var i=filterStart; i<filterEnd; i++){
        sum += filter[i];
    } 
    for(i=filterStart; i<filterEnd; i++){
        this.filter.push(filter[i] / sum);
    }
}

DelayBuffer.prototype.applyFilteredValue = function(filter, offset){
    var val = 0, 
        centerIndex = parseInt( (filter.length+1)/2, 10);
    for(var i=0; i<filter.length; i++){
        val += this.getBefore(offset - centerIndex + i) * filter[i];
    }
    return val;
};

/**
 * @constructor
 * @param {[type]} sampleRate [description]
 */
function LPFCreator(sampleRate){
    this._sampleRate = sampleRate;
}

/**
 * Creates a array to filter.
 * @param  {Number} cutoff [Hz]
 * @param  {Integer} radius If radius is 3, the filter length is 5.
 * @return {Array}
 */
LPFCreator.prototype.create = function(cutoff, radius){
    var omega = Math.PI * cutoff / this._sampleRate;
    function sinc(x){
        return x===0 ? 1 : Math.sin(x * omega ) / ( Math.PI * x); 
    }
    var filter = [];
    for(var i=-radius+1; i<radius; i++){
        filter.push(sinc(i));
    }
    return filter;
}

