var _lt = require('./internal/_lt');
var op = require('./op');


/**
 * Returns true if the first parameter is less than the second.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean} a < b
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *                 be curried right by explicitly passing `undefined` for its first argument.
 * @example
 *
 *      R.lt(2, 6); //=> true
 *      R.lt(2, 0); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(5)(10); //=> true
 *      R.lt(R.__, 5)(10); //=> false // right-sectioned currying
 */
module.exports = op(_lt);
