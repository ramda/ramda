var _curry1 = require('./internal/_curry1');
var _has = require('./internal/_has');


/**
 * 把一个对象转换成键值对数组。只使用对象的属性。
 *
 * 注意：输出数组的顺序在不同的JS运行环境可能不一致。
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj 需要转换的对象
 * @return {Array} 对所有属性转换后的键值对数组
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */
module.exports = _curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});
