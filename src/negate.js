var _curry1 = require('./internal/_curry1');


/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */
module.exports = _curry1(function negate(n) { return -n; });
