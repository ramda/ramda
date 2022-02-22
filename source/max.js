import _curry2 from './internal/_curry2.js';
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
  if (a === b) { return b; }

  function safeMax(x, y) {
    if ((x > y) !== (y > x)) { return y > x ? y : x; }
    return undefined;
  }

  var maxByValue = safeMax(a, b);
  if (maxByValue !== undefined) { return maxByValue; }

  var maxByType = safeMax(typeof a, typeof b);
  if (maxByType !== undefined) { return maxByType === typeof a ? a : b; }

  var stringA = toString(a);
  var maxByStringValue = safeMax(stringA, toString(b));
  if (maxByStringValue !== undefined) { return maxByStringValue === stringA ? a : b; }

  return b;
});
export default max;
