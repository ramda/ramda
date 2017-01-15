var _curry2 = require('./internal/_curry2');


/**
 * 集合中从后往前每个元素都使用条件函数判断，直到条件函数返回`false`跳出，然后返回集合在迭代跳出时的后`n`个元素。
 * 除非条件函数在处理元素的时候报错。条件函数接收一个值：
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn 每次迭代调用的函数
 * @param {Array} list 用于迭代的集合
 * @return {Array} 一个新的集合
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 */
module.exports = _curry2(function takeLastWhile(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0 && fn(list[idx])) {
    idx -= 1;
  }
  return Array.prototype.slice.call(list, idx + 1);
});
