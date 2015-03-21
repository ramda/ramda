/**
 * Basic, right-associative composition function. Accepts two functions and returns the
 * composite function; this composite function represents the operation `var h = f(g(x))`,
 * where `f` is the first argument, `g` is the second argument, and `x` is whatever
 * argument(s) are passed to `h`.
 *
 * This function's main use is to build the more general `compose` function, which accepts
 * any number of functions.
 *
 * @private
 * @category Function
 * @param {Function} f A function.
 * @param {Function} g A function.
 * @return {Function} A new function that is the equivalent of `f(g(x))`.
 * @example
 *
 *      var double = function(x) { return x * 2; };
 *      var square = function(x) { return x * x; };
 *      var squareThenDouble = _compose(double, square);
 *
 *      squareThenDouble(5); //≅ double(square(5)) => 50
 */
module.exports = function _compose(f, g) {
  return function() {
    return f.call(this, g.apply(this, arguments));
  };
};
