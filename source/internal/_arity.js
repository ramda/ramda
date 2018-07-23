export default function _arity(n, fn) {
  Object.defineProperty(fn, 'length', {
    value: n,
    configurable: true
  });
  return fn;
}
