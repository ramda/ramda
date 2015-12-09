var _curry2 = require('./internal/_curry2');


/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 */
module.exports = _curry2(function times(fn, n) {
  if (n === Infinity) {
    return function* repeatGenerator() {
      let idx = 0;

      while (true) {
        yield fn(idx);
        idx += 1;
      }
    };
  } else {
    var len = Number(n);
    var list = new Array(len);
    var idx = 0;
    while (idx < len) {
      list[idx] = fn(idx);
      idx += 1;
    }
    return list;
  }
});
