var _all = require('./internal/_all');
var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if all elements of the list match the predicate, `false` if there are any
 * that don't.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @example
 *
 *      > R.all(function(n) { return n < 3; }, [1, 2, 3])
 *      false
 *      > R.all(function(n) { return n <= 3; }, [1, 2, 3])
 *      true
 */
module.exports = _curry2(_all);
