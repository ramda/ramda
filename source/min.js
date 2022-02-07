import _curry2 from './internal/_curry2.js';
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
  if (a === b) { return a; }

  function safeMin(x, y) {
    if ((x < y) !== (y < x)) { return y < x ? y : x; }
    return undefined;
  }

  var minByValue = safeMin(a, b);
  if (minByValue !== undefined) { return minByValue; }

  var minByType = safeMin(typeof a, typeof b);
  if (minByType !== undefined) { return minByType === typeof a ? a : b; }

  var stringA = toString(a);
  var minByStringValue = safeMin(stringA, toString(b));
  if (minByStringValue !== undefined) { return minByStringValue === stringA ? a : b; }

  return a;
});
export default min;
