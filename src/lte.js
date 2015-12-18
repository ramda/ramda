var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * Note: `R.lte(18)` does not create a function which checks if a number is less
 * than or equal to 18. This is because `R.lte(18)` is equivalent to `R.lte(18, R.__)`.
 * If you want to create a function to check if a number is less than or equal
 * to 18, use `R.isLte(18)` instead.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte, R.isLte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */
module.exports = _curry2(function lte(a, b) { return a <= b; });
