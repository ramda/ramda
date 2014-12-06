var _curry3 = require('./internal/_curry3');
var keys = require('./keys');

/**
 * Returns a single item by iterating ovar an object's keys _in sorted order_, successively calling the iterator
 * function and passing it an accumulator value and the current value from the object, and
 * then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*
 *
 * Note: Since it sorts the object keys prior to iterating, `R.foldObj` will return consistent results
 * even for cases where `Object.keys` would return different-ordered lists.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (a,b -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 * current value from the object.
 * @param {*} acc The accumulator value.
 * @param {Object} obj The object to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *     var objA = {z: 'zzz', x: 'xxx', y: 'yyy', Z: 'ZZZ'};
 *     var cat = function(a, b) {
 *         return a + ' ' + b;
 *     };
 *
 *     R.foldObj(cat, '', objA); //=> ' ZZZ xxx yyy zzz'
 */
module.exports = _curry3(function foldObj(fn, acc, obj) {
    var ks = keys(obj).sort();
    var len = ks.length;
    var idx = -1;
    while (++idx < len) {
        acc = fn(acc, obj[ks[idx]]);
    }
    return acc;
});

