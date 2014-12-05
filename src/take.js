var _checkForMethod = require('./internal/_checkForMethod');
var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');


/**
 * Returns a new list containing the first `n` elements of the given list.  If
 * `n > * list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements to return.
 * @param {Array} list The array to query.
 * @return {Array} A new array containing the first elements of `list`.
 */
module.exports = _curry2(_checkForMethod('take', function(n, list) {
    return _slice(list, 0, Math.min(n, list.length));
}));
