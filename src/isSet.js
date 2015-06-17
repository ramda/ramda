var _curry1 = require('./internal/_curry1');
var _indexOf = require('./internal/_indexOf');


/**
 * Returns `true` if all elements are unique, in `R.equals` terms,
 * otherwise `false`.
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
 *      R.isSet([[42], [42]]); //=> false
 */
module.exports = _curry1(function isSet(list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    if (_indexOf(list, list[idx], idx + 1) >= 0) {
      return false;
    }
    idx += 1;
  }
  return true;
});
