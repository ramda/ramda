var _curry1 = require('./internal/_curry1');
var _slice = require('./internal/_slice');

/**
 * Accepts as its arguments a function and any number of values and returns a function that,
 * when invoked, calls the original function with only the values originally provided.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> b -> ... -> i -> j) -> a -> b -> ... -> i -> (() -> j)
 * @param {Function} fn The function to invoke.
 * @param {...*} [args] Arguments to invoke `fn` with.
 * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn`
 *         with `args`, while disregarding any new arguments.
 * @see R.partial
 * @example
 *
 *      var add = (a, b) => a + b;
 *      var sum = (...args) => args.reduce(add, 0);
 *
 *      var sumThunk = R.thunk(sum, 1, 2)
 *      sumThunk();  //=> 3
 *      sumThunk(5); //=> 3 // 5 is disregarded
 */
module.exports = _curry1(function(fn) {
  var args = _slice(arguments, 1);
  return function() {
    return fn.apply(this, args);
  };
});
