var _checkForMethod = require('./internal/_checkForMethod');
var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');


/**
 * Returns a new list containing all but the first `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The array to consider.
 * @return {Array} The last `n` elements of `list`.
 * @example
 *
 *     R.drop(3, [1,2,3,4,5,6,7]); //=> [4,5,6,7]
 */
module.exports = _curry2(_checkForMethod('drop', function drop(n, list) {
    return (n < list.length) ? _slice(list, n) : [];
}));
