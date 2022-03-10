import _curry2 from './internal/_curry2.js';
import _dispatchable from './internal/_dispatchable.js';
import _xdropRepeatsWith from './internal/_xdropRepeatsWith.js';
import dropRepeatsWith from './dropRepeatsWith.js';
import eqBy from './eqBy.js';


/**
 * Returns a new list without any consecutively repeating elements,
 * based upon the value returned by applying the supplied function to
 * each list element. [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeatsBy(Math.abs, [1, -1, -1, 2, 3, -4, 4, 2, 2]); //=> [1, 2, 3, -4, 2]
 */
var dropRepeatsBy = _curry2(function(fn, list) {
  return _dispatchable([], function() {
    return _xdropRepeatsWith(eqBy(fn));
  }, dropRepeatsWith(eqBy(fn)))(list);
});
export default dropRepeatsBy;
