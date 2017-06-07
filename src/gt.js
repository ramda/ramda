var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * Note: `R.gt(18)` does not create a function which checks if a number is
 * greater than 18. This is because `R.gt(18)` is equivalent to `R.gt(18, R.__)`.
 * If you want to create a function to check if a number is greater than
 * 18, use `R.isGt(18)` instead.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt, R.isGt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */
module.exports = _curry2(function gt(a, b) { return a > b; });
