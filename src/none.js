var _complement = require('./internal/_complement');
var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _xany = require('./internal/_xany');
var any = require('./any');


/**
 * Returns `true` if no elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      R.none(R.isNaN, [1, 2, 3]); //=> true
 *      R.none(R.isNaN, [1, 2, 3, NaN]); //=> false
 */
module.exports = _curry2(_complement(_dispatchable('any', _xany, any)));
