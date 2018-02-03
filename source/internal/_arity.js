import _isInteger from './_isInteger';

export default function _arity(n, fn) {
  if (!_isInteger(n) || n > 10 || n < 0) {
    throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
  var arityFn = function() {
    return fn.apply(this, arguments);
  };
  Object.defineProperty(arityFn, 'length', {
    value: n,
    configurable: true
  });
  return arityFn;
}
