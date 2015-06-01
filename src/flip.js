var _curry1 = require('./internal/_curry1');
var _slice = require('./internal/_slice');
var curryMinMax = require('./curryMinMax');


/**
 * Returns a new function much like the supplied one, except that the first two arguments'
 * order is reversed.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = function(a, b, c) {
 *        return ([]).concat(a, b, c);
 *      };
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 */
module.exports = _curry1(function flip(fn) {
  return curryMinMax(2, Infinity, function(a, b) {
    var args = _slice(arguments);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
