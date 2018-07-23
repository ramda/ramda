export default function _cloneFunction(fn) {
  const cloned = function() {
    return fn.apply(this, arguments);
  };
  Object.defineProperties(cloned, {
    length: {
      value: fn.length,
      configurable: true
    },
    name: {
      value: fn.name,
      configurable: true
    },
    toString: {
      value: () => fn.toString(),
      writable: true,
      configurable: true
    }
  });
  return cloned;
}
