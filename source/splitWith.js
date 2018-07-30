import _curry2 from './internal/_curry2';
import _reduce from './internal/_reduce';

/**
 * Takes a list and a predicate and returns a list of lists split by (and including) matches
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWith(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1, 2], [3, 1, 2], [3]]
 */
var splitWith = _curry2(function splitWith(pred, list) {
  let currIndex = 0;
  return _reduce(function(acc, curr) {
    const clone = acc.length === 0 ? [new Array()] : [...acc];
    clone[clone.length - 1].push(curr);
    if (pred(curr) && currIndex !== list.length - 1) {
      clone.push([]);
    }
    currIndex += 1;
    return clone;
  }, [], list);
});
export default splitWith;
