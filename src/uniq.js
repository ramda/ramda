var _contains = require('./internal/_contains');
var _curry1 = require('./internal/_curry1');


/**
 * Returns a new list containing only one copy of each element in the original list.
 * Equality is strict here, meaning reference equality for objects and non-coercing equality
 * for primitives.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([{}, {}]);     //=> [{}, {}]
 *      R.uniq([1, '1']);     //=> [1, '1']
 */
module.exports = _curry1(function uniq(list) {
  var idx = -1, len = list.length;
  var result = [], item;
  while (++idx < len) {
    item = list[idx];
    if (!_contains(item, result)) {
      result[result.length] = item;
    }
  }
  return result;
});
