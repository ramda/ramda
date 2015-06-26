var _curry2 = require('./internal/_curry2');
var _map = require('./internal/_map');
var curryN = require('./curryN');
var max = require('./max');
var pluck = require('./pluck');


/**
 * Takes a combining function, `combine`, and a list of functions, `fns`.
 * Returns a function which returns the result of applying `combine` to
 * the results of applying each function in `fns` to its arguments.
 *
 * This is best explained by example: `R.converge(c, [f, g, h])(1, 2)`
 * is equivalent to `c(f(1, 2), g(1, 2), h(1, 2))`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((b, c, ..., n) -> v) -> [(a -> b), (a -> c), ..., (a -> n)] -> (a -> v)
 * @param {Function} combine
 * @param {Array} fns
 * @return {Function}
 * @example
 *
 *      var add = function(a, b) { return a + b; };
 *      var multiply = function(a, b) { return a * b; };
 *      var subtract = function(a, b) { return a - b; };
 *
 *      //≅ multiply( add(1, 2), subtract(1, 2) );
 *      R.converge(multiply, [add, subtract])(1, 2); //=> -3
 *
 *      var add3 = function(a, b, c) { return a + b + c; };
 *      R.converge(add3, [multiply, add, subtract])(1, 2); //=> 4
 */
module.exports = _curry2(function converge(combine, fns) {
  return curryN(max(pluck('length', fns)), function() {
    var args = arguments;
    var context = this;
    return combine.apply(context, _map(function(fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
