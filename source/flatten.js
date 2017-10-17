import _curry1 from './internal/_curry1';
import _isArrayLike from './internal/_isArrayLike';


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */
var flatten = _curry1(function flatten(list) {
  var result = [];
  for (var idx = 0; idx < list.length; idx += 1) {
    var x = list[idx];
    if (_isArrayLike(x)) {
      var xs = flatten(x);
      for (var idx2 = 0; idx2 < xs.length; idx2 += 1) {
        result.push(xs[idx2]);
      }
    } else {
      result.push(x);
    }
  }
  return result;
});
export default flatten;
