import _curry2 from './internal/_curry2.js';
import _isNumber from './internal/_isNumber.js';


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(1, 5.5);  //=> [1, 2, 3, 4, 5]
 *      R.range(1.5, 5.5);  //=> [1.5, 2.5, 3.5, 4.5]
 */
var range = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var length = from < to ? Math.ceil(to - from) : 0;
  var result = Array(length);
  var idx = 0;
  while (idx < length) {
    result[idx] = idx + from;
    idx += 1;
  }
  return result;
});
export default range;
