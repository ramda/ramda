import _this$name from './_this$name';

export default (name, fn) =>
  Object.defineProperties(fn, {
    name: {
      value: name,
      configurable: true
    },
    toString: {
      value: _this$name,
      writable: true,
      configurable: true
    }
  });
