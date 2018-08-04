import _isArray from './_isArray';
import _isTransformer from './_isTransformer';
import _pcall from './_pcall';
import _reduce from './_reduce';
import _stepCat from './_stepCat';


/**
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer
 * @param {Function} fn catch-all implementation
 * @return {Function} A function that dispatches on object in list position
 */
export default function _dispatchKeyed(methodNames, xf, fn) {
  return function(...args) {
    const obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
    }
    const transducer = xf.apply(null, args);
    if (typeof obj.transduce === 'function') {
      return obj.transduce(transducer);
    }
    if (_isTransformer(obj)) {
      return transducer(obj);
    }
    const sink = _pcall(_stepCat, obj);
    if (sink.ok) {
      return _reduce(transducer(sink.value), sink.value['@@transducer/init'](), obj);
    }
    return fn.apply(this, arguments);
  };
}
