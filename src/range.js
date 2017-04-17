var _curry2 = require('./internal/_curry2');
var _isNumber = require('./internal/_isNumber');


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to The exclusive bounds of the sequence. The last number of
 *                    the returned list will be one less than or more than the
 *                    `to` parameter for incrementing and decrementing ranges
 *                    respectively.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 *      R.range(5, 1);    //=> [5, 4, 3, 2]
 */
module.exports = _curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  var dx = from < to ? 1 : -1;
  while (n !== to) {
    result.push(n);
    n += dx;
  }
  return result;
});
