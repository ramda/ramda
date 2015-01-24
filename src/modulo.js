var op = require('./op');


/**
 * Divides the second parameter by the first and returns the remainder.
 * Note that this functions preserves the JavaScript-style behavior for
 * modulo. For mathematical modulo see `mathMod`
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *                 be curried right by explicitly passing `R.__` for its first argument.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */
module.exports = op(function modulo(a, b) { return a % b; });
