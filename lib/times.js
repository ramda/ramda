var _curry2 = require('./_curry2');


/**
 * Calls an input function `n` times, returning an array containing the results of those
 * function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0` and is
 * gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (i -> a) -> i -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 */
module.exports = _curry2(function times(fn, n) {
    var list = new Array(Number(n));
    var len = list.length;
    var idx = -1;
    while (++idx < len) {
        list[idx] = fn(idx);
    }
    return list;
});
