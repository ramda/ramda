var op = require('./op');


/**
 * Returns true if the first parameter is greater than or equal to the second.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean} a >= b
 * @note Operator: this is right-curried by default, but can be called via sections
 * @example
 *
 *      R.gte(2, 6); //=> false
 *      R.gte(2, 0); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(R.__, 6)(2); //=> false
 *      R.gte(2)(0); //=> true
 *      R.gte(R.__)(1, 2); //=> true
 */
module.exports = op(function gte(a, b) { return a >= b; });
