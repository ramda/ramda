var _curry1 = require('./internal/_curry1');
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
 * @example
 *
 *      R.dec(42); //=> 41
 */
module.exports = _curry1(add(-1));
