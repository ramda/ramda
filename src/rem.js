var op = require('./op');


/**
 * Returns the remainder after division of `dividend` by `divisor` (with the
 * same sign as `dividend`).
 *
 * Accepts `R.__` as a placeholder to allow partial application of `divisor`.
 *
 * See also `R.mod`.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} dividend
 * @param {Number} divisor
 * @return {Number}
 * @see R.mod
 * @example
 *
 *      R.rem(42, 5); //=> 2
 *      R.rem(-42, 5); //=> -2
 *      R.rem(42, -5); //=> 2
 *      R.rem(-42, -5); //=> -2
 */
module.exports = op(function rem(dividend, divisor) {
    var a = +dividend;
    var n = +divisor;
    return isFinite(n) ? a % n : NaN;
});
