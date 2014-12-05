var _curry2 = require('./internal/_curry2');
var curry = require('./curry');
var nAry = require('./nAry');


/**
 * Wraps a constructor function inside a curried function that can be called with the same
 * arguments and returns the same type. The arity of the function returned is specified
 * to allow using variadic constructor functions.
 *
 * NOTE: Does not work with some built-in objects such as Date.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic constructor function
 *      var Widget = function() {
 *        this.children = Array.prototype.slice.call(arguments);
 *        // ...
 *      };
 *      Widget.prototype = {
 *        // ...
 *      };
 *      var allConfigs = {
 *        // ...
 *      };
 *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
 */
module.exports = _curry2(function constructN(n, Fn) {
    var f = function() {
        var Temp = function() {}, inst, ret;
        Temp.prototype = Fn.prototype;
        inst = new Temp();
        ret = Fn.apply(inst, arguments);
        return Object(ret) === ret ? ret : inst;
    };
    return n > 1 ? curry(nAry(n, f)) : f;
});
