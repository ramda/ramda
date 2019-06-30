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
    var receivedLen = received.length;
    var holdersCount = 0;
    var argsLen = arguments.length;
    var argsHoldersCount = 0;
    var left;
    var combined;
    var idx = -1;
    var argsIdx = 0;
    for (var i = 0; i < receivedLen; i++) {
      if (_isPlaceholder(received[i])) holdersCount++;
    }
    for (var i = 0; i < argsLen; i++) {
      if (_isPlaceholder(arguments[i])) argsHoldersCount++;
    }
    left = length - receivedLen + holdersCount - argsLen + argsHoldersCount;
    combined = Array(
      argsLen > holdersCount
        ? receivedLen + argsLen - holdersCount
        : receivedLen
    );
    while (++idx < receivedLen) {
      combined[idx] = _isPlaceholder(received[idx])
        ? argsIdx < argsLen
          ? arguments[argsIdx++]
          : received[idx]
        : received[idx];
    }
    while (argsIdx < argsLen) {
      combined[idx++] = arguments[argsIdx++];
    }
    return left <= 0
      ? fn.apply(this, combined)
      : _arity(left, _curryN(length, combined, fn));
  };
}
