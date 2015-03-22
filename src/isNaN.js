var _curry1 = require('./internal/_curry1');


/**
 * Returns `true` if the input value is `NaN`.
 *
 * Equivalent to ES6's [`Number.isNaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN).
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig * -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @example
 *
 *     R.isNaN(NaN);        //=> true
 *     R.isNaN(undefined);  //=> false
 *     R.isNaN({});         //=> false
 */
module.exports = _curry1(function isNaN(x) {
  return typeof x === 'number' && x !== x;
});
