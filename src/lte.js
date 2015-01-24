var op = require('./op');


/**
 * Returns true if the first parameter is less than or equal to the second.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean} a <= b
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *                 be curried right by explicitly passing `R.__` for its first argument.
 * @example
 *
 *      R.lte(2, 6); //=> true
 *      R.lte(2, 0); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(R.__, 2)(1); //=> true
 *      R.lte(2)(10); //=> true
 *      R.lte(R.__)(5, 4) // => true
 */
module.exports = op(function lte(a, b) { return a <= b; });
