import _Set from './internal/_Set';
import _curry2 from './internal/_curry2';
import filter from './filter';


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Performs the transformation lazily and returns a non-iterator iterable
 * if a non-array iterable is given in list position.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
var uniqBy = _curry2(function uniqBy(fn, list) {
  var set = new _Set();
  return filter(item => set.add(fn(item)), list);
});
export default uniqBy;
