import _arity from './_arity';
import _isFunction from './_isFunction';
import _nameFn from './_nameFn';
import _this$name from './_this$name';
import _toString from './_toString';


const emptyArray = Object.freeze([]);
const toString = value => _toString(value, emptyArray);

export default (name, fn) => {
  const wrapped = _nameFn(name, _arity(fn.length, function(...args) {
    const result = fn.apply(this, args);
    if (_isFunction(result)) {
      Object.defineProperties(result, {
        name: {
          get: () => wrapped.name + '(' + args.map(toString).join(', ') + ')',
          configurable: true
        },
        toString: {
          value: _this$name,
          writable: true,
          configurable: true
        }
      });
    }
    return result;
  }));
  return wrapped;
};
