var _checkForMethod = require('./internal/_checkForMethod');
var _curry2 = require('./internal/_curry2');


/**
 * 遍历给定的 `list`，对列表中的所有元素执行给定的方法 `fn`。
 *
 * `fn` 接收一个参数： *(value)*。
 *
 * 注意: `R.forEach` 并不会跳过已删除的或者未赋值的下标（sparse arrays），这一点和原生的
 *  `Array.prototype.forEach` 方法不用. 获取更多相关信息, 请查阅:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * 同样要注意, 不同于 `Array.prototype.forEach`，Ramda的 `forEach`返回一个新的数组。
 * 在其他一些类库中该方法被命名为 `each`.
 *
 * 若第二个参数自身存在 `forEach` 方法，则调用自身的 `forEach` 方法。
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */
module.exports = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));
