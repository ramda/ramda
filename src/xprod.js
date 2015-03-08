var _curry2 = require('./internal/_curry2');


/**
 * Creates a new list out of the two supplied by creating each possible
 * pair from the lists.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
module.exports = _curry2(function xprod(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
    var result = [];
    for (var aIdx = 0, aLen = a.length; aIdx < aLen; aIdx += 1) {
        for (var bIdx = 0, bLen = b.length; bIdx < bLen; bIdx += 1) {
            result.push([a[aIdx], b[bIdx]]);
        }
    }
    return result;
});
