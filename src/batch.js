var _checkForMethod = require('./internal/_checkForMethod');
var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');


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
 *      R.batch(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [3, 4], [5]]
 */
module.exports = _curry2(_checkForMethod('batch', function batch(n, list) {
  var idx = 0;
  var length = list.length;
  var acc = [];
  if (n < 1) {
    return length === 0 ? [] : [list];
  }
  while (idx < length) {
    acc[acc.length] = _slice(list, idx, Math.min(idx + n, length));
    idx += n;
  }
  return acc;
}));
