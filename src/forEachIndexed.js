var _curry2 = require('./internal/_curry2');


/**
 * Like `forEach`, but but passes additional parameters to the predicate function.
 *
 * `fn` receives three arguments: *(value, index, list)*.
 *
 * Note: `R.forEachIndexed` does not skip deleted or unassigned indices (sparse arrays),
 * unlike the native `Array.prototype.forEach` method. For more details on this behavior,
 * see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns the original
 * array. In some libraries this function is named `each`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a, i, [a] -> ) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives three arguments:
 *        (`value`, `index`, `list`).
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @example
 *
 *      // Note that having access to the original `list` allows for
 *      // mutation. While you *can* do this, it's very un-functional behavior:
 *      var plusFive = function(num, idx, list) { list[idx] = num + 5 };
 *      R.forEachIndexed(plusFive, [1, 2, 3]); //=> [6, 7, 8]
 */
module.exports = _curry2(function forEachIndexed(fn, list) {
    var idx = -1, len = list.length;
    while (++idx < len) {
        fn(list[idx], idx, list);
    }
    // i can't bear not to return *something*
    return list;
});
