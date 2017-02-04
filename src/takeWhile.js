var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _xtakeWhile = require('./internal/_xtakeWhile');


/**
 * 集合中从后往前每个元素都使用条件函数判断，直到条件函数返回`false`跳出，然后返回集合在迭代跳出时的后`n`个元素。
 * 除非条件函数在处理元素的时候报错。条件函数接收一个值：
 * *(value)*.
 *
 * 如果第2个参数有`takeWhile`方法，则调用`takeWhile`方法。
 *
 * 如果第2个参数是 transformer ，则`takeWhile`作为一个 transducer 调用。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn 每次迭代调用的函数
 * @param {Array} list 用于迭代的集合
 * @return {Array} 一个新的集合
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 */
module.exports = _curry2(_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len && fn(list[idx])) {
    idx += 1;
  }
  return Array.prototype.slice.call(list, 0, idx);
}));
