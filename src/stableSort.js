var _curry2 = require('./internal/_curry2');

/**
 * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
 * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
 * if they are equal, values of the same key retain their original order. Please note that this is a **copy** of the list.
 *  It does not modify the original.
 * @func
 * @memberOf R
 * @category List
 * @sig (a,a -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
module.exports = _curry2(function stableSort(comparator, list) {
  var sorted = [];
  var idx;

  idx = 0;
  while (idx < list.length) {
    sorted.push([list[idx], idx]);
    idx += 1;
  }

  sorted.sort(function(a, b) {
    var order = comparator(a[0], b[0]);
    return order === 0 ? a[1] - b[1] : order;
  });

  idx = 0;
  while (idx < list.length) {
    sorted[idx] = sorted[idx][0];
    idx += 1;
  }
  return sorted;
});
