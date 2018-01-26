import _curry1 from './internal/_curry1';
import _isNumber from './internal/_isNumber';


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] | (*… → *) -> Number
 * @param {Array} item The array or function to inspect.
 * @return {Number} The length of the array or the expected number of arguments for the function.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 *      R.length((a, b) => {}); //=> 2
 */
var length = _curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});
export default length;
