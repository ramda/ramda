var _curry2 = require('./internal/_curry2');


/**
 * Creates a new list out of the two supplied by pairing up
 * equally-positioned items from both lists.  The returned list is
 * truncated to the length of the shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 */
module.exports = _curry2(function zip(a, b) {
    var rv = [];
    var idx = -1;
    var len = Math.min(a.length, b.length);
    while (++idx < len) {
        rv[idx] = [a[idx], b[idx]];
    }
    return rv;
});
