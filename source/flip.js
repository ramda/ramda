import curryN from './curryN';


/**
 * Calls the passed function with first 2 arguments swapped.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> b -> (a, c, ...) -> z
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @param {*} a First argument
 * @param {*} b Second argument
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [a, b, c];
 *
 *      const isPositive = R.flip(R.gt, 0);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */
const flip = curryN(3, function flip(fn, a, b, ...args) {
  return fn(b, a, ...args);
});
export default flip;
