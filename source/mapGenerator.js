import _curry2 from './internal/_curry2';
import curryN from './curryN';

/**
 * Takes a function and
 * a generator function, treated as a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to the generator's values, and returns
 * a generator-returning function of the same arity as the generator function.
 *
 * To treat the generator function as a function functor, use `R.map` instead.
 *
 * @func
 * @memberOf R
 * @since v0.26.1
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the generator of the input `generatorFunction`.
 * @param {GeneratorFunction} generatorFunction The generator function that returns the generator to be mapped over.
 * @return {Function} The new function.
 * @see R.map
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, function*(){ yield 4 }); //=> () => (function*(){ yield 8 })()
 */
var mapGenerator = _curry2(function mapGenerator(fn, generatorFunction) {
  return curryN(generatorFunction.length, function*() {
    for (let val of generatorFunction.apply(this, arguments)) {
      yield fn.call(this, val);
    }
  });
});
export default mapGenerator;
