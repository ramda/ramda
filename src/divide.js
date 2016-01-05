var _curry2 = require('./internal/_curry2');
var _isNumber = require('./internal/_isNumber');
var toString = require('./toString');


/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */
module.exports = _curry2(function divide(a, b) {
  if (!_isNumber(a)) {
    throw new TypeError('‘divide’ expected a value of type Number ' +
                        'as its first argument; received ' + toString(a));
  }
  if (!_isNumber(b)) {
    throw new TypeError('‘divide’ expected a value of type Number ' +
                        'as its second argument; received ' + toString(b));
  }
  return a / b;
});
