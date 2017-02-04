var _curry2 = require('./internal/_curry2');


/**
 * 通过种子(seed)建立一个集合。输入的迭代函数返回 false 停止迭代，
 * 否则返回一个数对，前者添加到结果集合中，后者用作种子(seed)传递给下一轮迭代。
 *
 * 迭代函数只接收一个参数： *(seed)*
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn 迭代函数。接收一个参数`seed`，返回 false 退出迭代或者返回一个二元数组。
 *        二元数组第1个元素被添加到结果集合中，
 *        二元数组第2个元素被作为参数传递给下一次调用`fn`。
 * @param {*} seed 种子值(seed)
 * @return {Array} 结果集合
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */
module.exports = _curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});
