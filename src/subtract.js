var _curry2 = require('./internal/_curry2');
var _isNumber = require('./internal/_isNumber');
var toString = require('./toString');


/**
 * Subtracts two numbers. Equivalent to `a - b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */
module.exports = _curry2(function subtract(a, b) {
  if (!_isNumber(a)) {
    throw new TypeError('‘subtract’ expected a value of type Number ' +
                        'as its first argument; received ' + toString(a));
  }
  if (!_isNumber(b)) {
    throw new TypeError('‘subtract’ expected a value of type Number ' +
                        'as its second argument; received ' + toString(b));
  }
  return a - b;
});
