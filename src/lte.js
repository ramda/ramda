var _curry2 = require('./internal/_curry2');


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
 * @example
 *
 *      R.lte(2, 6); //=> true
 *      R.lte(2, 0); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(R.__, 2)(1); //=> true
 *      R.lte(2)(10); //=> true
 */
module.exports = _curry2(function lte(a, b) { return a <= b; });
