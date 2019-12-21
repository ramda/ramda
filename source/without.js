import _includes from './internal/_includes';
import _curry2 from './internal/_curry2';
import flip from './flip';
import reject from './reject';


/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Performs the transformation lazily and returns a non-iterator iterable
 * if a non-array iterable is given in list position.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */
var without = _curry2(function(xs, list) {
  return reject(flip(_includes)(xs), list);
});
export default without;
