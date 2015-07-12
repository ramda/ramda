var _contains = require('./internal/_contains');
var _curry2 = require('./internal/_curry2');


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to each
 * list element. Prefers the first item if the supplied function produces the
 * same value on two items. `R.equals` is used for comparison.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a, b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 *      R.uniqBy(R.prop("id"), [{id: 1, value: 10 }, {id: 2, value: true}, {id: 1, value: "foo"}]); //=> [{id: 1, value: 10}, {id: 2, value: true}]
 */
module.exports = _curry2(function uniqBy(fn, list) {
  var idx = 0, applied = [], result = [], appliedItem, item;
  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (!_contains(appliedItem, applied)) {
      result.push(item);
      applied.push(appliedItem);
    }
    idx += 1;
  }
  return result;
});
