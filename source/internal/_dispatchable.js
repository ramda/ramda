import _educe from './_educe';
import _isArray from './_isArray';
import _isIterable from './_isIterable';
import _isString from './_isString';
import _isTransformer from './_isTransformer';


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */
export default function _dispatchable(methodNames, xf, fn) {
  return function() {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      var transducer = xf.apply(null, args);
      if (_isTransformer(obj)) {
        return transducer(obj);
      }
      if (obj && typeof obj.transduce === 'function') {
        return obj.transduce(transducer);
      }
      if (_isIterable(obj) && !_isString(obj)) {
        return _educe(transducer, obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
