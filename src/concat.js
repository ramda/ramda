var _curry2 = require('./internal/_curry2');
var _isArray = require('./internal/_isArray');
var _isFunction = require('./internal/_isFunction');
var toString = require('./toString');


/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} a
 * @param {Array|String} b
 * @return {Array|String}
 *
 * @example
 *
 *      R.concat([], []); //=> []
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 */
module.exports = _curry2(function concat(a, b) {
  if (a == null || !_isFunction(a.concat)) {
    throw new TypeError(toString(a) + ' does not have a method named "concat"');
  }
  if (_isArray(a) && !_isArray(b)) {
    throw new TypeError(toString(b) + ' is not an array');
  }
  return a.concat(b);
});
