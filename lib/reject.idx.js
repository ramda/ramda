var _curry2 = require('./_curry2');
var _filterIdx = require('./_filterIdx');
var not = require('./not');


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
 * @alias reject.idx
 * @example
 *
 *      var lastTwo = function(val, idx, list) {
 *        return list.length - idx <= 2;
 *      };
 *
 *      R.reject.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
 */
module.exports = _curry2(function rejectIdx(fn, list) {
    return _filterIdx(not(fn), list);
});
