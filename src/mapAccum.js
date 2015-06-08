var _curry3 = require('./internal/_curry3');


/**
 * The mapAccum function behaves like a combination of map and reduce; it applies a
 * function to each element of a list, passing an accumulating parameter from left to
 * right, and returning a final value of this accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should return
 * a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = function(a, b) {
 *        return [a + b, a + b];
 *      }
 *
 *      R.mapAccum(append, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 */
module.exports = _curry3(function mapAccum(fn, acc, list) {
  var idx = 0, len = list.length, result = [], tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});
