var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');


/**
 * Returns a new list containing the last `n` elements of a given list, passing each value
 * to the supplied predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is passed one argument: *(value)*.
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
 *      var lteTwo = function(x) {
 *        return x <= 2;
 *      };
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4]); //=> [3, 4]
 */
module.exports = _curry2(function dropWhile(pred, list) {
    var idx = 0;
    for (var len = list.length; idx < len && pred(list[idx]); idx += 1) {}
    return _slice(list, idx);
});
