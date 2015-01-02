goog.provide("synthjs.process.Query");
goog.provide("synthjs.process.QueryHandler");

goog.scope(function(){

// var queryId = 0;

/**
 * @constructor
 */
var Query = synthjs.process.Query = function(){
    this._array = [];
    // this._id = ++queryId;
};

goog.object.extend(Query.prototype, {

    /**
     * Pushes a query.
     * @param  {synthjs.process.Query} query [description]
     * @return {[type]}       [description]
     */
    join: function(query){
        this._array = this._array.concat(query.getDump()['query']);
    },

    getDump: function(){
        return this._array;
        // return {
        //     "query": this._array
        //     // "id": this._id
        // };
    },

    push: function(obj){
        this._array.push(obj);
    }
});

var EventType = synthjs.process.Query.EventType = {
    START: 'start',
    FINISH: 'finish'
};

/**
 * @constructor
 * @extends {synthjs.utility.EventTarget}
 */
var Handler = synthjs.process.QueryHandler = function(){
    goog.base(this);
};
goog.inherits(Handler, synthjs.utility.EventTarget);

goog.object.extend(Handler.prototype, {
    // dispatchQuery: function(obj){
    //     var queryArray = obj['query'],
    //         queryid = obj['id'];

    //     this.dispatchEvent(new goog.events.Event(
    //         EventType.START,
    //         {
    //             queryid: queryid
    //         })
    //     );
    //     goog.array.forEach(queryArray, this.dispatchEach, this);

    //     this.dispatchEvent(new goog.events.Event(
    //         EventType.FINISH,
    //         {
    //             queryid: queryid
    //         })
    //     );

    // },
    // dispatchEach: goog.abstractMethod,

    /**
     * [ description]
     * @param  {Object} obj [description]
     * @return {synthjs.utility.Deferred}     [description]
     */
    queryDeferredEach: function(obj){
        goog.asserts.fail("Does not implement!");
    },

    /**
     * [ description]
     * @param  {Array} list [description]
     * @return {synthjs.utility.Deferred}      [description]
     */
    reduceDeferred: function(list){
        goog.asserts.fail("Does not implement!");

    }
});

});