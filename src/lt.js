var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * Note: `R.lt(18)` does not create a function which checks if a number is less
 * than 18. This is because `R.lt(18)` is equivalent to `R.lt(18, R.__)`. If you
 * want to create a function to check if a number is less than 18, use `R.isLt(18)`
 * instead.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt, R.isLt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */
module.exports = _curry2(function lt(a, b) { return a < b; });
