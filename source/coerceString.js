import _curry1 from './internal/_curry1.js';
import _coerceString from './internal/_coerceString.js';

/**
 * Coerces a value to a string.
 * Any input that is not a a string, `null` or `undefined` will be turned into an empty string
 *
 * If the given value is an `[object Date]`, this method will use `toDateString`.
 *
 * R.coerceString(new Date('2001-02-03T04:05:06Z')); //=> 'Fri Feb 02 2001'
 *
 * If the given value is an `[object Object]`, this method will use `JSON.stringify`.
 *
 * R.coerceString({foo: 1, bar: 2, baz: 3}); //=> '{"foo":1,"bar":2,"baz":3}'
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.coerceString(42); //=> '42'
 *      R.coerceString('abc'); //=> 'abc'
 *      R.coerceString([1, 2, 3]); //=> '1, 2, 3'
 *      R.coerceString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.coerceString(new Date('2001-02-03T04:05:06Z')); //=> 'Fri Feb 02 2001'
 */
var coerceString = _curry1(function coerceString(val) { return _coerceString(val); });
export default coerceString;
