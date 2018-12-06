import _arity from './_arity';
import _isPlaceholder from './_isPlaceholder';


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
export default function _curryN(length, received, fn) {
  return function () {
    var r_index = 0, a_index = 0;
    while (a_index < arguments.length) {
      var valid = _isPlaceholder(arguments[a_index]);
      if (r_index < received.length && _isPlaceholder(received[r_index])) {
        valid ? false : length--
        received[r_index] = arguments[a_index++];
      }
      else if (r_index >= received.length) {
        valid ? false : length--
        received.push(arguments[a_index++])
      }
      r_index++;
    }
    return length <= 0 ? fn.apply(this, received) : _arity(length, _curryN(length, received, fn));
  };
}
