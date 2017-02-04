var _Set = require('./internal/_Set');
var _curry2 = require('./internal/_curry2');


/**
 * 基于输入函数返回值来判断“重复”，返回一个没有重复元素的集合。
 * 如果出现重复元素，则保留第1次出现的元素。
 * 比较函数是`R.equals`。
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn 处理元素然后返回一个用于比较的值
 * @param {Array} list 待处理的集合
 * @return {Array} 不重复的元素集合
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */
module.exports = _curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});
