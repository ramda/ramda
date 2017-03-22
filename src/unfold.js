var _curry2 = require('./internal/_curry2');


/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either an empty array to stop iteration, or a singleton array containing an
 * array of length 2, with the value that's added to the resulting list and the
 * seed to be used in the next call of the iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (b -> [(a, b)]) -> b -> [a]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either an empty array to quit iteration or an array with an array of length two
 *        to proceed. The element at index 0 of the array of length two will be added
 *        to the resulting array, and the element at index 1 will be passed
 *        to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? [] : [[-n, n + 10]];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0][0], f(f(x)[0][1])[0][0], f(f(f(x)[0][1])[0][1])[0][0], ...]
 */
module.exports = _curry2(function unfold(fn, seed) {
  var maybePair = fn(seed);
  var result = [];
  while (maybePair.length === 1) {
    var pair = maybePair[0];
    result[result.length] = pair[0];
    maybePair = fn(pair[1]);
  }
  return result;
});
