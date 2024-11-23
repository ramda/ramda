import _reduce from './internal/_reduce.js';
import curry from './curry.js';


/**
 * Returns the number of items in a given `list` matching the predicate `f`
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} predicate The function to match items against.
 * @param {Array} list The list to count elements from.
 * @return {Number} The count of items matching the predicate.
 * @example
 *
 *      const even = x => x % 2 == 0;
 *
 *      R.count(even, [1, 2, 3, 4, 5]); // => 2
 *      R.map(R.count(even), [[1, 1, 1], [2, 3, 4, 5], [6]]); // => [0, 2, 1]
 */
var count = curry(function(pred, list) {
  return _reduce(function(a, e) { return pred(e) ? a + 1 : a; }, 0, list);
});

export default count;
