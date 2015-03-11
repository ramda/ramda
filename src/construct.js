var _curry1 = require('./internal/_curry1');
var _meta = require('./internal/_meta');
var constructN = require('./constructN');


/**
 * Wraps a constructor function inside a curried function that can be called with the same
 * arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Constructor function
 *      var Widget = function(config) {
 *        // ...
 *      };
 *      Widget.prototype = {
 *        // ...
 *      };
 *      var allConfigs = {
 *        // ...
 *      };
 *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
 */
module.exports = _curry1(function construct(Fn) {
    return constructN(_meta.arity(Fn), Fn);
});
