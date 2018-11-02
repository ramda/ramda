import _curry2 from './internal/_curry2';
import _reduce from './internal/_reduce';


/**
 * Takes a list and a predicate and returns a list of lists split by matches
 *
 * @func
 * @memberOf R
 * @since v0.25.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWith(R.equals('a'), [1, 2, 3, 1, 2, 3]); //=> [[1], [3, 1], [3]]
 */
var splitWith = _curry2(function splitWith(pred, list) {
  let currIndex = 0;
  return _reduce(function(acc, curr) {
    if (pred(curr)) {
      if (currIndex !== list.length - 1) {
        acc.push([]);
      }
    } else {
      if (acc[acc.length - 1]) {
        acc[acc.length - 1].push(curr);
      } else {
        acc.push([curr]);
      }
    }
    currIndex += 1;
    return acc;
  }, [], list);
});
export default splitWith;
