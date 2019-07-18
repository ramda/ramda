import _curry2 from './internal/_curry2';
import curryN from './curryN';

/**
 * Takes a function and
 * an async function, treated as a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to the promise's resolved value, and returns
 * a promise-returning function of the same arity as the async function.
 *
 * To treat the async function as a function functor, use `R.map` instead.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called with the contents of the promise of the input `asyncFunction`.
 * @param {AsyncFunction} asyncFunction The async function that returns the promise to be mapped over.
 * @return {Function} The new function.
 * @see R.map
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, async () => 4); //=> () => (async () => 8)()
 */
var mapAsync = _curry2(function mapAsync(fn, asyncFunction) {
  return curryN(asyncFunction.length, async function() {
    return fn.call(this, await asyncFunction.apply(this, arguments));
  });
});
export default mapAsync;
