var _curry1 = require('./internal/_curry1');


/**
 * Checks if the input value is not `null` or not `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.22.1
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is not `undefined` or not `null`, otherwise `false`.
 * @example
 *
 *      R.isNotNil(null); //=> false
 *      R.isNotNil(undefined); //=> false
 *      R.isNotNil(0); //=> true
 *      R.isNotNil([]); //=> true
 */
module.exports = _curry1(function isNotNil(x) { return x != null; });
