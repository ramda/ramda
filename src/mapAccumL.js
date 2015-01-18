var _curry3 = require('./internal/_curry3');


/**
 * The mapAccumL function behaves like a combination of map and foldl; it applies a
 * function to each element of a list, passing an accumulating parameter from left to
 * right, and returning a final value of this accumulator together with the new list.
 *
 * The iterator function receives two values: *(acc, value)*
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      > R.mapAccumL(function(acc, x) { return [acc + x, acc + x]; }, '', ['a', 'b', 'c', 'd'])
 *      ['abcd', ['a', 'ab', 'abc', 'abcd']]
 */
module.exports = _curry3(function mapAccumL(fn, acc, list) {
    var idx = -1, len = list.length, result = new Array(len), tuple = [acc];
    while (++idx < len) {
        tuple = fn(tuple[0], list[idx]);
        result[idx] = tuple[1];
    }
    return [tuple[0], result];
});
