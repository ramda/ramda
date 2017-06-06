var _curry2 = require('./internal/_curry2');
var _isNumber = require('./internal/_isNumber');
var toString = require('./toString');


/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */
module.exports = _curry2(function multiply(a, b) {
  if (!_isNumber(a)) {
    throw new TypeError('‘multiply’ expected a value of type Number ' +
                        'as its first argument; received ' + toString(a));
  }
  if (!_isNumber(b)) {
    throw new TypeError('‘multiply’ expected a value of type Number ' +
                        'as its second argument; received ' + toString(b));
  }
  return a * b;
});
