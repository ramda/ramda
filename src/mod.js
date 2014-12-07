var op = require('./op');


/**
 * Returns the value of `dividend` modulo `divisor`: the remainder after
 * division of `dividend` by `divisor`, but with the same sign as `divisor`.
 *
 * Accepts `R.__` as a placeholder to allow partial application of `divisor`.
 *
 * See also `R.rem`.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} dividend
 * @param {Number} divisor
 * @return {Number}
 * @see R.rem
 * @example
 *
 *      R.mod(42, 5); //=> 2
 *      R.mod(-42, 5); //=> 3
 *      R.mod(42, -5); //=> -3
 *      R.mod(-42, -5); //=> -2
 */
module.exports = op(function mod(dividend, divisor) {
    var a = +dividend;
    var n = +divisor;
    return (a % n + n) % n;
});
