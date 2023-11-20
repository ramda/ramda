import _curry1 from './internal/_curry1.js';
import isEmpty from './isEmpty.js';


/**
 * Returns `false` if the given value is its type's empty value; `true`
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
 *      R.isNotEmpty([1, 2, 3]);           //=> true
 *      R.isNotEmpty([]);                  //=> false
 *      R.isNotEmpty('');                  //=> false
 *      R.isNotEmpty(null);                //=> true
 *      R.isNotEmpty({});                  //=> false
 *      R.isNotEmpty({length: 0});         //=> true
 *      R.isNotEmpty(Uint8Array.from('')); //=> false
 */
var isNotEmpty = _curry1(function isNotEmpty(x) { return !isEmpty(x); });
export default isNotEmpty;
