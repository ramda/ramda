var _curry1 = require('./internal/_curry1');

/**
 * Returns a boolean indicating whether the input is a Truthy value or not
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Ord a => a -> Boolean
 * @param {*} The JavaScript object whose truthiness has to be determined
 * @return {*} true, if the object is truthy, false otherwise
 * @example
 *
 *      R.isTruthy('')        //=> false
 *      R.isTruthy(undefined) //=> false
 *      R.isTruthy(null)      //=> false
 *      R.isTruthy([])        //=> true
 */

module.exports = _curry1(function isTruthy(arg) {
  return !!arg;
});
