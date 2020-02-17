import _cloneRegExp from './_cloneRegExp.js';
import type from '../type.js';


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
export default function _clone(value, deep, map = new Map()) {
  // this avoids the slower switch with a quick if decision removing some milliseconds in each run.
  if (_isPrimitive(value)) {
    return value;
  }

  var copy = function copy(copiedValue) {
    // Check for circular and same references on the object graph and return its corresponding clone.
    var cachedCopy = map.get(value);

    if (cachedCopy) {
      return cachedCopy;
    }
    map.set(value, copiedValue);

    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        copiedValue[key] = deep ? _clone(value[key], true, map) : value[key];
      }
    }
    return copiedValue;
  };

  switch (type(value)) {
    case 'Object':  return copy(Object.create(Object.getPrototypeOf(value)));
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value.valueOf());
    case 'RegExp': return _cloneRegExp(value);
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'BigInt64Array':
    case 'BigUint64Array':
      return value.slice();
    default:        return value;
  }
}

function _isPrimitive(param) {
  var type = typeof param;
  return param == null || (type != 'object' && type != 'function');
}
