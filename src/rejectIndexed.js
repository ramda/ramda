var _complement = require('./internal/_complement');
var _curry2 = require('./internal/_curry2');
var _filterIndexed = require('./internal/_filterIndexed');


/**
 * Like `reject`, but passes additional parameters to the predicate function. The predicate
 * function is passed three arguments: *(value, index, list)*.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a, i, [a] -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} The new filtered array.
 * @example
 *
 *      var lastTwo = function(val, idx, list) {
 *        return list.length - idx <= 2;
 *      };
 *
 *      R.rejectIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
 */
module.exports = _curry2(function rejectIndexed(fn, list) {
  return _filterIndexed(_complement(fn), list);
});
