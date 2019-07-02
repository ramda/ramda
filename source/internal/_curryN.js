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
  return function() {
    var combined,
      left,
      idx;
    var receivedLen = received.length;
    var holdersCount = 0;
    var argsLen = arguments.length;
    var argsHoldersCount = 0;
    var argsIdx = 0;

    idx = 0;
    while (idx < receivedLen) {
      if (_isPlaceholder(received[idx])) {
        holdersCount += 1;
      }
      idx += 1;
    }

    idx = 0;
    while (idx < argsLen) {
      if (_isPlaceholder(arguments[idx])) {
        argsHoldersCount += 1;
      }
      idx += 1;
    }

    left = length - receivedLen + holdersCount - argsLen + argsHoldersCount;

    combined = Array(
      argsLen > holdersCount
        ? receivedLen + argsLen - holdersCount
        : receivedLen
    );

    idx = 0;
    while (idx < receivedLen) {
      if (_isPlaceholder(received[idx])) {
        if (argsIdx < argsLen) {
          combined[idx] = arguments[argsIdx];
          argsIdx += 1;
        } else {
          combined[idx] = received[idx];
        }
      } else {
        combined[idx] = received[idx];
      }
      idx += 1;
    }
    while (argsIdx < argsLen) {
      combined[idx] = arguments[argsIdx];
      idx += 1;
      argsIdx += 1;
    }

    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
}
