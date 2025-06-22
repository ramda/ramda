import _curry2 from './internal/_curry2.js';
import _has from './internal/_has.js';
import _mapKeys from './internal/_mapKeys.js';


/**
 * Converts an object to a new one by changing all keys that are also found as keys in a mapping
 * object to their corresponding values from that object.
 *
 * @func
 * @memberOf R
 * @since v0.31.0
 * @category Object
 * @sig Object -> Object -> Object
 * @param {Function} mapping An object pairing existing keys with new ones
 * @param {Object} obj A target object to convert
 * @return {Object} The result of replacing existing keys with their mapping counterparts when such exist
 * @see R.mapKeys, R.rebuild
 * @example
 *
 *      var mapping = { name: 'firstName', address: 'street' };
 *      var obj = { name: 'John', city: 'Paris' };
 *
 *      R.renameKeys(mapping, obj) //=>  { firstName: 'John', city: 'Paris' }
 */
var renameKeys = _curry2(function renameKeys(mapping, obj) {
  return _mapKeys(
    function(key) {
      return _has(key, mapping) ? mapping[key] : key;
    },
    obj
  );
});
export default renameKeys;
