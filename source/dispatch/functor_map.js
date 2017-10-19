import _isArrayLike from '../internal/_isArrayLike';
import _isFunction from '../internal/_isFunction';
import _isObject from '../internal/_isObject';
import array_map from '../instances/array_map';
import function_map from '../instances/function_map';
import object_map from '../instances/object_map';

export default function functor_map(fn, functor) {
  if (_isArrayLike(functor)) return array_map(fn, functor);
  if (_isFunction(functor)) return function_map(fn, functor);
  if (_isObject(functor)) return object_map(fn, functor);
  throw new TypeError('No functor instance for ' + functor);
};
