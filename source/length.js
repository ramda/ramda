import _curry1 from './internal/_curry1';
import _isNumber from './internal/_isNumber';


/**
 * Returns the number of elements in the array, set or map
 * by returning `collection.length` or `collection.size`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array|Set|Map} collection The collection to inspect.
 * @return {Number} The length of the collection.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 *      R.length(new Set(['x', 'y', 'z'])); //=> 3
 *      R.length(new Map([['k1', 'v1'], ['k2', 'v2']])); //=> 2
 */
var length = _curry1(function length(list) {
  if (list == null) {
    return NaN;
  }
  if (_isNumber(list.length)) {
    return list.length;
  }
  if (_isNumber(list.size)) {
    return list.size;
  }
  return NaN;
});
export default length;
