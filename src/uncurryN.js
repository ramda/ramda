var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');
var curryN = require('./curryN');


/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = function(a) {
 *        return function(b) {
 *          return function(c) {
 *            return function(d) {
 *              return a + b + c + d;
 *            };
 *          };
 *        };
 *      };
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      curriedAddFour(1, 2, 3, 4); //=> 10
 */
module.exports = _curry2(function uncurryN(depth, fn) {
  return curryN(depth, function() {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, _slice(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});
