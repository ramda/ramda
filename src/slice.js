var _checkForMethod = require('./internal/_checkForMethod');
var _curry3 = require('./internal/_curry3');


/**
 * Returns a list containing the elements of `xs` from `fromIndex` (inclusive)
 * to `toIndex` (exclusive).
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
 *      var xs = R.range(0, 10);
 *      R.slice(2, 5)(xs); //=> [2, 3, 4]
 */
module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, xs) {
  return Array.prototype.slice.call(xs, fromIndex, toIndex);
}));
