import _cloneRegExp from './_cloneRegExp';
import type from '../type';


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */
export default function _clone(value, deep, refs = new Map()) {
  var copy = function copy(copiedValue) {
    if (refs.has(value)) {
      return refs.get(value);
    }
    refs.set(value, copiedValue);
    for (var key in value) {
      copiedValue[key] = deep ?
        _clone(value[key], true, refs) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':  return copy({});
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value.valueOf());
    case 'RegExp':  return _cloneRegExp(value);
    default:        return value;
  }
}
