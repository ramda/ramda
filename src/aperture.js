var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');

/**
 * Returns a new list, composed of n-tuples of consecutive elements
 * If `n` is greater than the length of the list, an empty list is returned.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-tuples
 * @return {Array} The new list.
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */
module.exports = _curry2(function aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = _slice(list, idx, idx + n);
    idx += 1;
  }
  return acc;
});
