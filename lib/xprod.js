var _curry2 = require('./_curry2');


/**
 * Creates a new list out of the two supplied by creating each possible
 * pair from the lists.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> b -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
module.exports = _curry2(function xprod(a, b) { // = xprodWith(prepend); (takes about 3 times as long...)
    var idx = -1;
    var ilen = a.length;
    var j;
    var jlen = b.length;
    // Better to push them all or to do `new Array(ilen * jlen)` and calculate indices?
    var result = [];
    while (++idx < ilen) {
        j = -1;
        while (++j < jlen) {
            result[result.length] = [a[idx], b[j]];
        }
    }
    return result;
});
