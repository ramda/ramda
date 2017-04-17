var _curry1 = require('./internal/_curry1');

/**
 * Returns a boolean indicating whether the input is a Falsy value or not
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Ord a => a -> Boolean
 * @param {*} The JavaScript object whose falsiness has to be determined
 * @return {*} true, if the object is falsy, false otherwise
 * @example
 *
 *      R.isFalsy('')        //=> false
 *      R.isFalsy(undefined) //=> false
 *      R.isFalsy(null)      //=> false
 *      R.isFalsy([])        //=> true
 */

module.exports = _curry1(function isFalsy(arg) {
  return !arg;
});
