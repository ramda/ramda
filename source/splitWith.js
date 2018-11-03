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
 *      R.splitWith(R.equals(2), [1, 2, 3, 4, 2, 1]); //=> [[1], [3, 4], [1]];
 *      R.splitWith(R.equals('a'), 'bananas'); //=> [['b'],['n'],['n'],['s']]
 */

var splitWith = _curry2(function splitWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var ret = [];
  while (idx < len) {
    var entry = [];
    while (idx < len && !pred(list[idx])) {
      entry = entry.concat(list[idx]);
      idx += 1;
    }
    ret = entry.length ? ret.concat([entry]) : ret;
    idx += 1;
  }
  return ret;
});
export default splitWith;
