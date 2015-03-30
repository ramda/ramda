var _curry1 = require('./internal/_curry1');
var _indexOf = require('./internal/_indexOf');


/**
 * Returns the modes (most common values) of the given list.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.modes([]); //=> []
 *      R.modes(['R', 'a', 'm', 'd', 'a']); //=> ['a']
 *      R.modes([1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 */
module.exports = _curry1(function modes(list) {
  var values = [];
  var counts = [];
  var count;
  var max = 0;
  var len = list.length;
  var idx = -1;
  while (++idx < len) {
    var val = list[idx];
    var valIdx = _indexOf(values, val);
    if (valIdx >= 0) {
      count = counts[valIdx] += 1;
    } else {
      values[values.length] = val;
      count = counts[counts.length] = 1;
    }
    if (count > max) {
      max = count;
    }
  }
  var result = [];
  len = counts.length;
  idx = -1;
  while (++idx < len) {
    if (counts[idx] === max) {
      result[result.length] = values[idx];
    }
  }
  return result;
});
