var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * Note: `R.gte(18)` does not create a function which checks if a number is greater
 * than or equal to 18. This is because `R.gte(18)` is equivalent to `R.gte(18, R.__)`.
 * If you want to create a function to check if a number is greater than or equal
 * to 18, use `R.isGte(18)` instead.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte, R.isGte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */
module.exports = _curry2(function gte(a, b) { return a >= b; });
