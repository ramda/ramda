var _curry1 = require('./internal/_curry1');
var _isNumber = require('./internal/_isNumber');

/**
 * Returns 'true' if the provided number is even, 'false' otherwise.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig Number -> Boolean
 * @param {Number} the number to test
 * @return {Boolean}
 * @example
 *
 *      R.even(1); //=> false
 *      R.even(4); //=> true
 *      R.even(4.1); //=> true
 *      R.even('abc'); //=> false
 *      R.even({'abc': 'abc'}); //=> false
 */
module.exports = _curry1(function even(number) {
  return !_isNumber(number) ? false : (number & 1) == 0;
});
