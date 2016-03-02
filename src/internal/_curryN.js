var _arity = require('./_arity');
var _complement = require('./_complement');
var _equals = require('./_equals');
var _filter = require('./_filter');
var _isPlaceholder = require('./_isPlaceholder');

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
  var arity = length - _filter(_complement(_isPlaceholder), received).length;
  var _fn = _arity(arity, function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (!_isPlaceholder(received[combinedIdx]) ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined)
                     : _curryN(length, combined, fn);
  });
  // keep track of the original function and the combined args
  _fn.curried = true
  _fn.fn = fn.curried ? fn.fn : fn
  _fn.args = received;
  // compare the original function with the combined args
  _fn.equals = function(fn2) {
    return fn2.curried &&
           _equals(fn2.fn, _fn.fn, [], []) &&
           _equals(fn2.args, _fn.args, [], []);
  };
  return _fn
};
