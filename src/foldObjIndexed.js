var _curry3 = require('./internal/_curry3');
var keys = require('./keys');

/**
 * Like `foldObj`, but passes additional parameters to the predicate function.
 * The iterator function receives four values: *(acc, value, key, object)*
 *
 * Note: Since it sorts the object keys prior to iterating, `R.foldObj.idx` will return consistent results
 * even for cases where `Object.keys` would return different-ordered lists.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (a,b,i,[b] -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives four values: the accumulator, the
 * current element from object, that element's key, and the entire object itself.
 * @param {*} acc The accumulator value.
 * @param {Object} obj The object to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *     var obj = {a: 'aaa', Z: 'ZZZ', dot: '.'};
 *     var catko = function(acc, v, k, o) {
 *         return acc + ' ' + ([k, v, o.dot].join(', '));
 *     };
 *     R.foldObj.idx(catko, '', obj); //=> ' Z, ZZZ, . a, aaa, . dot, ., .'
 */
module.exports = _curry3(function foldObjIndexed(fn, acc, obj) {
    var ks = keys(obj).sort();
    var len = ks.length;
    var idx = -1;
    while (++idx < len) {
        acc = fn(acc, obj[ks[idx]], ks[idx], obj);
    }
    return acc;
});

