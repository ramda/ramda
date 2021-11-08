import _curry2 from './internal/_curry2.js';
import equals from './equals.js';
import toString from './toString.js';

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */
var min = _curry2(function min(a, b) {
  if (equals(a, b)) { return b; }
  if (a > b || b > a) { return b < a ? b : a; }
  throw new TypeError('cannot compare ' + toString(a) + ' with ' + toString(b));
});
export default min;
