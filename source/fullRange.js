import _curry2 from './internal/_curry2';
import _isNumber from './internal/_isNumber';


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (inclusive).
 * (Ruby-like behavior)
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to The last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.fullRange(1, 5);    //=> [1, 2, 3, 5]
 *      R.fullRange(50, 53);  //=> [50, 51, 52, 53]
 */
var fullRange = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to + 1) {
    result.push(n);
    n += 1;
  }
  return result;
});
export default fullRange;
