var _curry3 = require('./internal/_curry3');


/**
 * Returns the substring `str` from `fromIndex` (inclusive) to `toIndex`
 * (exclusive).
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex
 * @param {Number} toIndex
 * @param {String} str
 * @return {String}
 * @example
 *
 *      R.strSlice(1, 3, 'ramda');        //=> 'am'
 *      R.strSlice(1, Infinity, 'ramda'); //=> 'amda'
 *      R.strSlice(0, -1, 'ramda');       //=> 'ramd'
 *      R.strSlice(-3, -1, 'ramda');      //=> 'md'
 */
module.exports = _curry3(function strSlice(fromIndex, toIndex, str) {
  return str.slice(fromIndex, toIndex);
});
