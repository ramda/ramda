var _curry3 = require('./internal/_curry3');


/**
 * 接收一个条件函数、一个迭代函数、一个初始值，返回一个与初始值同类型的值。
 * 如果迭代的结果满足条件函数，那么返回这个值。
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred 条件函数
 * @param {Function} fn 迭代函数
 * @param {*} init 初始值
 * @return {*} 满足条件函数的终止值
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */
module.exports = _curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});
