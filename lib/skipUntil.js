var _curry2 = require('./_curry2');
var _slice = require('./_slice');


/**
 * Returns a new list containing the last `n` elements of a given list, passing each value
 * to the supplied predicate function, beginning when the predicate function returns
 * `true`. Excludes the element that caused the predicate function to fail. The predicate
 * function is passed one argument: *(value)*.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @example
 *
 *      var isTwo = function(x) {
 *        return x === 2;
 *      };
 *
 *      R.skipUntil(isTwo, [1, 2, 3, 4]); //=> [2, 3, 4]
 */
module.exports = _curry2(function skipUntil(fn, list) {
    var idx = -1, len = list.length;
    while (++idx < len && !fn(list[idx])) {}
    return _slice(list, idx);
});
