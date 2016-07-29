var _arity = require('./_arity');


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
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var idx = 0;
    while (idx < received.length) {
      combined.push(received[idx]);
      idx += 1;
    }
    idx = 0;
    while (idx < arguments.length) {
      combined.push(arguments[idx]);
      idx += 1;
    }
    if (combined.length >= length) {
      return fn.apply(this, combined);
    } else {
      return _arity(length - combined.length, _curryN(length, combined, fn));
    }
  };
};
