var op = require('./op');


/**
 * Subtracts two numbers. Equivalent to `a - b` but curried.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *                 be curried right by explicitly passing `R.__` for its first argument.
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */
module.exports = op(function subtract(a, b) { return a - b; });
