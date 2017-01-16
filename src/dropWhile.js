var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _xdropWhile = require('./internal/_xdropWhile');


/**
 *
 * 返回一个不包含所有满足predicate方法的头部元素的新的list。
 *
 * 从左向右依次对list中的元素执行predicate方法，直至返回一个假值。predicate方法需要作为第一个参数传入。
 *
 * 若第二个参数自身存在`dropWhile`方法，则调用自身的`dropWhile`方法。
 *
 * 若在列表位置中给出`transfomer`，则用作`transducer`。
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 */
module.exports = _curry2(_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len && pred(list[idx])) {
    idx += 1;
  }
  return Array.prototype.slice.call(list, idx);
}));
