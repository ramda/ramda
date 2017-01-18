var _curry3 = require('./internal/_curry3');
var adjust = require('./adjust');
var always = require('./always');


/**
 * 修改一个数组拷贝指定位置的值，然后返回修改后的数组拷贝。
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx 需要修改的位置
 * @param {*} x 在返回数组中修改时需要使用的值
 * @param {Array|Arguments} list 需要被修改的类数组对象
 * @return {Array} 第`index`个位置用`x`替换后的`list`的拷贝
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */
module.exports = _curry3(function update(idx, x, list) {
  return adjust(always(x), idx, list);
});
