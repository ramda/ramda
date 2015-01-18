var _any = require('./internal/_any');
var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if at least one of elements of the list match the predicate, `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @example
 *
 *      > R.any(function(n) { return n > 3; }, [1, 2, 3])
 *      false
 *      > R.any(function(n) { return n >= 3; }, [1, 2, 3])
 *      true
 */
module.exports = _curry2(_any);
