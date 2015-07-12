var add = require('./add');


/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */
module.exports = add(-1);
