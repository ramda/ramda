var _curry1 = require('./internal/_curry1');


/**
 * Returns `true` if the input value is `NaN`.  Note that this will report
 * true for a variable, `v` that has the value `NaN` even though the language
 * will report that `v == NaN; //=> false`.
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
 *      R.eqNaN(NaN);        //=> true
 *      R.eqNaN(undefined);  //=> false
 *      R.eqNaN({});         //=> false
 */
module.exports = _curry1(function eqNaN(x) {
  return typeof x === 'number' && x !== x;
});
