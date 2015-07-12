var _curry2 = require('./internal/_curry2');


/**
 * Returns the nth character of the given string.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {String} str
 * @return {String}
 * @deprecated since v0.16.0
 * @example
 *
 *      R.nthChar(2, 'Ramda'); //=> 'm'
 *      R.nthChar(-2, 'Ramda'); //=> 'd'
 */
module.exports = _curry2(function nthChar(n, str) {
  return str.charAt(n < 0 ? str.length + n : n);
});
