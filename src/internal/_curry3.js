var _curry2 = require('./_curry2');


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _curry2(function(_b, _c) { return fn(a, _b, _c); });
      case 2:
        return function(_c) { return fn(a, b, _c); };
      default:
        return fn(a, b, c);
    }
  };
};
