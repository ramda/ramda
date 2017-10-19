import _isArray from '../internal/_isArray';
import _isObject from '../internal/_isObject';
import _isString from '../internal/_isString';
import array_concat from '../instances/array_concat';
import object_concat from '../instances/object_concat';
import string_concat from '../instances/string_concat';

export default function semigroup_concat(a, b) {
  if (_isArray(a)) return array_concat(a, b);
  if (_isObject(a)) return object_concat(a, b);
  if (_isString(a)) return string_concat(a, b);
  throw new TypeError('No semigroup instance for ' + a);
};
