import _curry3 from './internal/_curry3.js';
import _dispatchable from './internal/_dispatchable.js';
import _xinsertUntil from './internal/_xinsertUntil.js';


/**
 * Returns a new list including the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `insertUntil` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {*} elt The accumulator value.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @example
 *
 *      const gteTwo = x => x >= 2;
 *
 *      R.insertUntil(gteTwo, 2,[1,3,3]); //=> [1, 2, 3, 3]
 */
var insertUntil = _curry3(_dispatchable(['insertUntil'], _xinsertUntil, function insertUntil(fn, elt, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && !fn(xs[idx])) {
    idx += 1;
  }
  var result = Array.prototype.slice.call(xs, 0);
  result.splice(idx, 0, elt);
  return result;
}));
export default insertUntil;
