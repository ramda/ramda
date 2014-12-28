var _curry3 = require('./internal/_curry3');


/**
 * The mapAccumR function behaves like a combination of map and foldr; it applies a
 * function to each element of a list, passing an accumulating parameter from right
 * to left, and returning a final value of this accumulator together with the new list.
 *
 * Similar to `mapAccumL`, except moves through the input list from the right to the
 * left.
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
 *      var digits = ['1', '2', '3', '4'];
 *      var append = function(a, b) {
 *          return [a + b, a + b];
 *      }
 *
 *      R.mapAccumR(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
 */
module.exports = _curry3(function mapAccumR(fn, acc, list) {
    var idx = list.length, len = list.length, result = new Array(len), tuple = [acc];
    while (idx--) {
        tuple = fn(tuple[0], list[idx]);
        result[idx] = tuple[1];
    }
    return [tuple[0], result];
});
