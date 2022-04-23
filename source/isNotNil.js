import isNil from './isNil.js';
import _curry1 from './internal/_curry1.js';


/**
 * Checks if the input value is not `null` and not `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.28.2
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
var isNotNil = _curry1(function isNotNil(x) { return !isNil(x); });
export default isNotNil;
