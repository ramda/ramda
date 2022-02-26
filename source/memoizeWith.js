import _arity from './internal/_arity.js';
import _curry2 from './internal/_curry2.js';
import _has from './internal/_has.js';


/**
 * Takes a string-returning function `keyGen` and a function `fn` and returns
 * a new function that returns cached results for subsequent
 * calls with the same arguments.
 *
 * When the function is invoked, `keyGen` is applied to the same arguments
 * and its result becomes the cache key. If the cache contains something
 * under that key, the function simply returns it and does not invoke `fn` at all.
 *
 * Otherwise `fn` is applied to the same arguments and its return value
 * is cached under that key and returned by the function.
 *
 * Care must be taken when implementing `keyGen` to avoid key collision,
 * or if tracking references, memory leaks and mutating arguments.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} keyGen The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *      const withAge = memoizeWith(o => `${o.birth}/${o.death}`, ({birth, death}) => {
 *      //                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^
 *      //                          keyGen                        fn
 *        console.log(`computing age for ${birth}/${death}`);
 *        return ({birth, death, age: death - birth});
 *      });
 *
 *      withAge({birth: 1921, death: 1999});
 *      //=> LOG: computing age for 1921/1999
 *      //=> {birth: 1921, death: 1999, age: 78} (returned from fn)
 *
 *      withAge({birth: 1921, death: 1999});
 *      //=> {birth: 1921, death: 1999, age: 78} (returned from cache)
 */
var memoizeWith = _curry2(function memoizeWith(keyGen, fn) {
  var cache = {};
  return _arity(fn.length, function() {
    var key = keyGen.apply(this, arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});
export default memoizeWith;
