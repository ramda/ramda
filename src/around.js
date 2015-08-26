var curryN = require('./curryN');
/**
 * Accepts three functions, `before`, `after` and `fn`, and a single value.
 * `R.around` effectively wraps `fn` with `before` and `after` by first passing the
 * given value to `before`, which returns a value that is then passed to `fn`,
 * whose return value is finally passed to `after`. The return value of
 * `R.around` is the result of this call to `after`.
 *
 * This can be useful for converting some type `a` to be compatible with some
 * function `(b -> b)` and back again, where an isomorphism exists between
 * `a` and `b`: `R.around(aToB, bToA, bFn)`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a -> b) -> (c -> d) -> (b -> c) -> a -> d
 * @param {Function} before
 * @param {Function} after
 * @param {Function} fn
 * @param {*}        x
 * @return {*}
 * @example
 *
 *      var withPairs   = R.around(R.toPairs, R.fromPairs);
 *      var headToUpper = R.adjust(R.toUpper, 0);
 *      var upperKeys   = withPairs(R.map(headToUpper));
 *      upperKeys({ cow: 'moo', dog: 'woof', cat: 'meow' });
 *      //=> { COW: 'moo', DOG: 'woof', CAT: 'meow' }
 */
module.exports = curryN(4, function around(before, after, fn, x) {
  return after(fn(before(x)));
});
