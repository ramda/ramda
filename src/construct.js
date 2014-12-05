var constructN = require('./constructN');


/**
 * Wraps a constructor function inside a curried function that can be called with the same
 * arguments and returns the same type.
 *
 * NOTE: Does not work with some built-in objects such as Date.
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
module.exports = function construct(Fn) {
    return constructN(Fn.length, Fn);
};
