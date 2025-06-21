import _curry2 from './internal/_curry2.js';
import _mapKeys from './internal/_mapKeys.js';

/**
 * Transforms an object by converting the keys to new values.
 *
 * **Note** that if multiple keys map to the same new key, the last one processed will dominate.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (String -> String) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map, R.rebuild, R.renameKeys
 * @example
 *
 *      R.mapKeys(toUpper, {foo: 1, bar: 2, baz: 3}) //=> {FOO: 1, BAR: 2, BAZ: 3}
 */
var mapKeys = _curry2(_mapKeys);

export default mapKeys;
