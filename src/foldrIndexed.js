var _curry3 = require('./internal/_curry3');


/**
 * Like `foldr`, but passes additional parameters to the predicate function. Moves through
 * the input list from the right to the left.
 *
 * The iterator function receives four values: *(acc, value, index, list)*.
 *
 * Note: `R.foldrIndexed` does not skip deleted or unassigned indices (sparse arrays),
 * unlike the native `Array.prototype.reduce` method. For more details on this behavior,
 * see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a,b,i,[b] -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives four values: the accumulator, the
 *        current element from `list`, that element's index, and the entire `list` itself.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var letters = ['a', 'b', 'c'];
 *      var objectify = function(accObject, elem, idx, list) {
 *        accObject[elem] = idx;
 *        return accObject;
 *      };
 *
 *      R.foldrIndexed(objectify, {}, letters); //=> { 'c': 2, 'b': 1, 'a': 0 }
 */
module.exports = _curry3(function foldrIndexed(fn, acc, list) {
    var idx = list.length;
    while (idx--) {
        acc = fn(acc, list[idx], idx, list);
    }
    return acc;
});
