var _checkForMethod = require('./internal/_checkForMethod');
var _curry3 = require('./internal/_curry3');


/**
 * Returns a list containing the elements of `xs` from `fromIndex` (inclusive)
 * to `toIndex` (exclusive).
 *
 * Dispatches to its third argument's `slice` method if present. As a
 * result, one may replace `[a]` with `String` in the type signature.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {Array} xs The list to take elements from.
 * @return {Array} The slice of `xs` from `fromIndex` to `toIndex`.
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, xs) {
  return Array.prototype.slice.call(xs, fromIndex, toIndex);
}));
