var _curry3 = require('./internal/_curry3');


/**
 * Takes a binary function, `combine`, and unary functions `f` and `g`.
 * Returns a function with one parameter, `x`, which returns the result
 * of applying `combine` to `f(x)` and `g(x)`.
 *
 * `R.converge(combine, f, g)(x)` is equivalent to `combine(f(x), g(x))`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((b, c) -> d) -> (a -> b) -> (a -> c) -> (a -> d)
 * @param {Function} combine
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @example
 *
 *      R.converge(R.subtract, square, R.inc)(10); //=> (10 * 10) - (10 + 1)
 */
module.exports = _curry3(function converge(combine, f, g) {
  return function(x) {
    return combine.call(this, f.call(this, x), g.call(this, x));
  };
});
