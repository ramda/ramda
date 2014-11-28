var _curry3 = require('./_curry3');


/**
 * Like `reduce`, but passes additional parameters to the predicate function.
 *
 * The iterator function receives four values: *(acc, value, index, list)*
 *
 * Note: `R.reduce.idx` does not skip deleted or unassigned indices (sparse arrays),
 * unlike the native `Array.prototype.reduce` method. For more details on this behavior,
 * see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * @func
 * @memberOf R
 * @category core
 * @category List
 * @sig (a,b,i,[b] -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives four values: the accumulator, the
 *        current element from `list`, that element's index, and the entire `list` itself.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @alias reduce.idx
 * @example
 *
 *      var letters = ['a', 'b', 'c'];
 *      var objectify = function(accObject, elem, idx, list) {
 *        accObject[elem] = idx;
 *        return accObject;
 *      };
 *
 *      R.reduce.idx(objectify, {}, letters); //=> { 'a': 0, 'b': 1, 'c': 2 }
 */
module.exports = _curry3(function reduceIdx(fn, acc, list) {
    var idx = -1, len = list.length;
    while (++idx < len) {
        acc = fn(acc, list[idx], idx, list);
    }
    return acc;
});
