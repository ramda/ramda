var _curry2 = require('./internal/_curry2');


/**
 * Returns the character code of the nth character of the given string.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> Number
 * @param {Number} n
 * @param {String} str
 * @return {Number}
 * @deprecated since v0.16.0
 * @example
 *
 *      R.nthCharCode(2, 'Ramda'); //=> 'm'.charCodeAt(0)
 *      R.nthCharCode(-2, 'Ramda'); //=> 'd'.charCodeAt(0)
 */
module.exports = _curry2(function nthCharCode(n, str) {
  return str.charCodeAt(n < 0 ? str.length + n : n);
});
