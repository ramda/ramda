/**
 * Like `filter`, but passes additional parameters to the predicate function. The predicate
 * function is passed three arguments: *(value, index, list)*.
 *
 * @func
 * @memberOf R
 * @category core
 * @category List
 * @sig (a, i, [a] -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} The new filtered array.
 * @alias filter.idx
 * @example
 *
 *      var lastTwo = function(val, idx, list) {
 *        return list.length - idx <= 2;
 *      };
 *      R.filter.idx(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [0, 9]
 */
function filterIdx(fn, list) {
    var idx = -1, len = list.length, result = [];
    while (++idx < len) {
        if (fn(list[idx], idx, list)) {
            result[result.length] = list[idx];
        }
    }
    return result;
}
R.filter.idx = _curry2(filterIdx);
