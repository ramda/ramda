var _curry3 = require('./internal/_curry3');
var _foldl = require('./internal/_foldl');


/**
 * Returns a single item by iterating through the list, successively calling the iterator
 * function and passing it an accumulator value and the current value from the array, and
 * then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*
 *
 * Note: `R.foldl` does not skip deleted or unassigned indices (sparse arrays), unlike
 * the native `Array.prototype.reduce` method. For more details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a,b -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      > var numbers = [1, 2, 3]
 *      > var add = function(a, b) { return a + b; }
 *      > R.foldl(add, 10, numbers)
 *      16
 */
module.exports = _curry3(_foldl);
