var _curry2 = require('./internal/_curry2');
var _lt = require('./internal/_lt');


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
 * @example
 *
 *      R.lt(2, 6); //=> true
 *      R.lt(2, 0); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(5)(10); //=> true
 *      R.lt(R.__, 5)(10); //=> false // right-sectioned currying
 */
module.exports = _curry2(_lt);
