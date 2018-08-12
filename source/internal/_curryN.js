import _arity from './_arity';
import _partial from './_partial';
import _nameReturnedFn from './_nameReturnedFn';


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {string} name Name for the function.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
export default (length, name, fn, nameIf) => {
  const curried = _nameReturnedFn(name, _arity(length, function() {
    if (arguments.length < length) {
      return _partial(curried, arguments);
    } else {
      return fn.apply(this, arguments);
    }
  }), nameIf);
  return curried;
};
