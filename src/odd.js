var _curry1 = require('./internal/_curry1');
var _isNumber = require('./internal/_isNumber');
var even = require('./even');

/**
 * Returns 'true' if the provided number is odd, 'false' otherwise.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig Number -> Boolean
 * @param {Number} the number to test
 * @return {Boolean}
 * @example
 *
 *      R.odd(1); //=> true
 *      R.odd(1.1); //=> true
 *      R.odd(4); //=> false
 *      R.odd('abc'); //=> false
 *      R.odd({'abc': 'abc'}); //=> false
 */
module.exports = _curry1(function odd(number) {
  return !_isNumber(number) ? false : !even(number);
});
