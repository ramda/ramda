import _curry1 from './internal/_curry1.js';
import isEmpty from './isEmpty.js';


/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.29.2
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty, R.isEmpty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);           //=> true
 *      R.isEmpty([]);                  //=> false
 *      R.isEmpty('');                  //=> false
 *      R.isEmpty(null);                //=> true
 *      R.isEmpty({});                  //=> false
 *      R.isEmpty({length: 0});         //=> true
 *      R.isEmpty(Uint8Array.from('')); //=> false
 */
var isNotEmpty = _curry1(function isNotEmpty(x) { return !isEmpty(x); });
export default isNotEmpty;
