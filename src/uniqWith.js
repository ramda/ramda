var _containsWith = require('./internal/_containsWith');
var _curry2 = require('./internal/_curry2');


/**
 * Returns a new list containing only one copy of each element in the original list, based
 * upon the value returned by applying the supplied predicate to two list elements. Prefers
 * the first item if two items compare equal based on the predicate.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a, a -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = function(a, b) { return String(a) === String(b); };
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */
module.exports = _curry2(function uniqWith(pred, list) {
  var idx = 0, len = list.length;
  var result = [], item;
  while (idx < len) {
    item = list[idx];
    if (!_containsWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});
