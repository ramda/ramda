var _curry1 = require('./internal/_curry1');
var _indexOf = require('./internal/_indexOf');


/**
 * Returns `true` if all elements are unique, otherwise `false`.
 * Uniqueness is determined using strict equality (`===`).
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if all elements are unique, else `false`.
 * @example
 *
 *      R.isSet(['1', 1]); //=> true
 *      R.isSet([1, 1]);   //=> false
 *      R.isSet([{}, {}]); //=> true
 */
module.exports = _curry1(function isSet(list) {
  var len = list.length;
  var idx = -1;
  while (++idx < len) {
    if (_indexOf(list, list[idx], idx + 1) >= 0) {
      return false;
    }
  }
  return true;
});
