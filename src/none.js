var _any = require('./internal/_any');
var _complement = require('./internal/_complement');
var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _xany = require('./internal/_xany');


/**
 * Returns `true` if no elements of the list match the predicate,
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @example
 *
 *      R.none(R.isNaN, [1, 2, 3]); //=> true
 *      R.none(R.isNaN, [1, 2, 3, NaN]); //=> false
 */
module.exports = _curry2(_complement(_dispatchable('any', _xany, _any)));
