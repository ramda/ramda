import _isArray from './_isArray.js';
import _isInteger from './_isInteger.js';

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @private
 * @param {String|Number} prop The property name to set
 * @param {*} val The new value
 * @param {Object|Array} obj The object to clone
 * @return {Object|Array} A new object equivalent to the original except for the changed property.
 */
export default function _assoc(prop, val, obj) {
  if (_isInteger(prop) && _isArray(obj)) {
    var _idx = prop < 0 ? obj.length + prop : prop;

    var arr = [].concat(obj);
    arr[_idx] = val;
    return arr;

  }

  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(obj);
    for (var i = 0; i < symbols.length; i += 1) {
      result[symbols[i]] = obj[symbols[i]];
    }
  }
  result[prop] = val;
  return result;
}
