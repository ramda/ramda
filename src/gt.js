var _gt = require('./internal/_gt');
var op = require('./op');


/**
 * Returns true if the first parameter is greater than the second.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean} a > b
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *                 be curried right by explicitly passing `undefined` for its first argument.
 * @example
 *
 *      R.gt(2, 6); //=> false
 *      R.gt(2, 0); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(R.__, 2)(10); //=> true
 *      R.gt(2)(10); //=> false
 */
module.exports = op(_gt);
