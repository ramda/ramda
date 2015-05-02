var _curry2 = require('./internal/_curry2');
var _reduce = require('./internal/_reduce');


/**
 * Subdivides the input array into parts of size `n`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the batches.
 * @param {Array} list The list to be divide into batches.
 * @return {Array} The new list.
 * @aka chunk
 * @example
 *
 *      R.chunk(3, [5,3,8,1,2,9,7]);
 *      //=> [ [ 5, 3, 8 ],  [ 1, 2, 9 ], [ 7 ] ]
 */

module.exports = _curry2(function(n, list) {
  var idx = 0;
  if (n < 1) {
    return list.length === 0 ? [] : [list];
  } else {
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
  }
});
