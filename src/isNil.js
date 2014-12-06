/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *     R.isNil(null); //=> true
 *     R.isNil(undefined); //=> true
 *     R.isNil(0); //=> false
 *     R.isNil([]); //=> false
 */
module.exports = function isNil(x) { return x == null; };
