import _curry2 from './internal/_curry2.js';
import equals from './equals.js';
import toString from './toString.js';

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */
var max = _curry2(function max(a, b) {
  if (equals(a, b)) { return b; }
  if (a > b || b > a) { return b > a ? b : a; }
  throw new TypeError('cannot compare ' + toString(a) + ' with ' + toString(b));
});
export default max;
