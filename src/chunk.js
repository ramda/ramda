var _curry2 = require('./internal/_curry2');
var _reduce = require('./internal/_reduce');


/**
 * Takes a number n and a list and returns a list made up
 * of lists with n elements in them. If the chunks are not
 * equal in length the last list will have the remaining
 * elements.
 * @func
 * @memberOf R
 * @category List
 * @sig Integer -> [a] -> [[a]]
 * @param {Integer} a number to determine how many elements in each list.
 * @param {Array} list The array to split into chunks.
 * @return {Array} A nested array, containing arrays of n elements with the
 *         last array containing at most n elements.
 * @example
 *
 *      R.chunk(3, [5,3,8,1,2,9,7]);
 *      //=> [ [ 5, 3, 8 ],  [ 1, 2, 9 ], [ 7 ] ]
 */

module.exports = _curry2(function(n, list) {
  var idx = 0;
  return _reduce(function(acc, elt) {
    var pos = Math.floor(idx / n);
    if (acc[pos]) {
      var xs = acc[pos];
      acc[pos][xs.length] = elt;
    } else {
      acc[acc.length] = [elt];
    }
    idx++;
    return acc;
  }, [], list);
});
