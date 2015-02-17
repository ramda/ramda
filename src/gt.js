var _curry2 = require('./internal/_curry2');
var _gt = require('./internal/_gt');


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
 * @example
 *
 *      R.gt(2, 6); //=> false
 *      R.gt(2, 0); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(R.__, 2)(10); //=> true
 *      R.gt(2)(10); //=> false
 */
module.exports = _curry2(_gt);
