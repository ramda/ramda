var _curry2 = require('./internal/_curry2');


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
 * @example
 *
 *      R.gte(2, 6); //=> false
 *      R.gte(2, 0); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(R.__, 6)(2); //=> false
 *      R.gte(2)(0); //=> true
 */
module.exports = _curry2(function gte(a, b) { return a >= b; });
