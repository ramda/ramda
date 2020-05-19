import _cloneRegExp from './_cloneRegExp';
import _queue from './_queue';
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
export default function _clone(value, deep) {
  const refs = new WeakMap();
  return _queue((value,push) => {
    switch (type(value)) {
      case 'Array':
      case 'Object':
        break;
      case 'Date':
        return new Date(value.valueOf());
      case 'RegExp':
        return _cloneRegExp(value);
      default:
        return value;
    }
    const copiedValue = type(value) === 'Array' ? [] : {};
    if (refs.has(value)) {
      return refs.get(value);
    }
    refs.set(value, copiedValue);
    for (let key in value) {
      if (!deep) {
        copiedValue[key] = value[key];
      } else {
        push(value[key], copiedValue, key);
      }
    }
    return copiedValue;
  }, value, ([source]) => source, ([, target, key],result) => target[key] = result);
}
