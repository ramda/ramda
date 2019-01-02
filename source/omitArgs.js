import _curry2 from './internal/_curry2';

/**
 * Wraps a function of any arity (including nullary) in a function additional
 * parameters that are omitted.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired number of ignored parameters.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`.
 * @see R.nAry
 * @example
 *
 *      const takesTwoArgs = (a, b) => a + b;
 *
 *      takesTwoArgs(1, 2); //=> 3
 *
 *      const ignoresTwoArgs = R.omitArgs(2, takesTwoArgs);
 *
 *      // First `n` arguments are completely ignored
 *      ignoresTwoArgs(1, 2, 3, 4); //=> 7
 * @symb R.omitArgs(0, f)(a, b) = f(a, b)
 * @symb R.omitArgs(1, f)(a, b) = f(b)
 * @symb R.omitArgs(2, f)(a, b) = f()
 */
var omitArgs = _curry2(function omitArgs(n, fn) {
  if (n < 0) {
    throw new Error('First argument to omitArgs must be a non-negative integer');
  }
  var arity = n + fn.length;
  switch (arity) {
    case 0: return function() { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 1: return function(a0) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 2: return function(a0, a1) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, Array.from(arguments).slice(n)); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, Array.from(arguments).slice(n)); };
    default: throw new Error('The increased arity of the function passed to omitArgs must be no greater than ten');
  }
});

export default omitArgs;
