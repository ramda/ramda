var _curry3 = require('./internal/_curry3');
var equals = require('./equals');


/**
 *
 * 接受一个函数和两个可以作为该函数参数的值，如果这两个值通过该函数的执行结果是相同的则返回 `true` ，否则返回 `false` 。
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */
module.exports = _curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});
