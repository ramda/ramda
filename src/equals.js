var _curry2 = require('./internal/_curry2');
var _equals = require('./internal/_equals');


/**
 *
 * 如果给定的参数是相等的则返回 `true` ，否则返回 `false` 。处理几乎所有JavaScript支持的数据结构。
 *
 * 若两个参数自身存在 `equals` 方法，则对称地调用 `equals` 方法。
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
module.exports = _curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});
