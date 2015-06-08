var isArrayLike = require('../isArrayLike');


/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive function
 * based on the flag passed in.
 *
 * @private
 */
module.exports = function _makeFlat(recursive) {
  return function flatt(list) {
    var value, result = [], idx = 0, j;
    while (idx < list.length) {
      if (isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        while (j < value.length) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
};
