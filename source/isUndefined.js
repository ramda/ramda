import _curry1 from './internal/_curry1';


/**
 * Checks if the input value is `undefined`.
 *
 * @func
 * @memberOf R
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` otherwise `false`.
 * @example
 *
 *      R.isUndefined(undefined); //=> true
 *      R.isUndefined(0); //=> false
 *      R.isUndefined([]); //=> false
 */
var isUndefined = _curry1(function isUndefined(x) { return x === undefined; });
export default isUndefined;
