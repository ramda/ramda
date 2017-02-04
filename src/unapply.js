var _curry1 = require('./internal/_curry1');


/**
 * 输入一个只接收一个数组的作为参数的函数，返回一个函数执行下列过程：
 *
 *   - 接收所有参数；
 *   - 把参数作为数组传递给`fn`；
 *   - 返回执行结果。
 *
 * 换言之，R.apply 输入一个只接收一个数组的作为参数的函数，返回一个不定参函数。R.unapply 是 R.apply 的逆函数。
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */
module.exports = _curry1(function unapply(fn) {
  return function() {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
