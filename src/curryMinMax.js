var __ = require('./__');
var _arity = require('./internal/_arity');
var _curry3 = require('./internal/_curry3');
var _slice = require('./internal/_slice');


/**
 * Returns a curried equivalent of the provided function, with the
 * specified arity. The curried function has two unusual capabilities.
 * First, its arguments needn't be provided one at a time. If `g` is
 * `R.curryMinMax(3, 3, f)`, the following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`,
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> Number -> (* -> a) -> (* -> a)
 * @param {Number} min The minimum number of arguments to which `fn` may be applied.
 * @param {Number} max The maximum number of arguments to which `fn` may be applied.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var addFourNumbers = function() {
 *        return R.sum([].slice.call(arguments, 0, 4));
 *      };
 *
 *      var curriedAddFourNumbers = R.curryMinMax(4, 4, addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry3(function curryMinMax(min, max, fn) {
  return _arity(min, function() {
    var n = arguments.length;
    if (n > max) {
      throw new Error('Too many arguments (expected at most ' + max + '; received ' + n + ')');
    }
    var placeholders = 0;
    var idx = n;
    while (--idx >= 0) {
      if (arguments[idx] === __) {
        placeholders += 1;
      }
    }
    if (placeholders === 0 && n >= min) {
      return fn.apply(this, _slice(arguments, 0, max));
    } else {
      var initialArgs = _slice(arguments);
      return curryMinMax(min - n + placeholders, max - n + placeholders, function() {
        var currentArgs = _slice(arguments);
        var combinedArgs = [];
        var idx = -1;
        var currentArgsIdx = 0;
        while (++idx < n) {
          var val = initialArgs[idx];
          combinedArgs[idx] = (val === __ ? currentArgs[currentArgsIdx++] : val);
        }
        while (currentArgsIdx < currentArgs.length) {
          combinedArgs[idx++] = currentArgs[currentArgsIdx++];
        }
        return fn.apply(this, combinedArgs);
      });
    }
  });
});
