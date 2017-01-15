var _curry1 = require('./internal/_curry1');


/**
 * 把一个对象转换成键值对数组。使用对象的属性和原型链上的属性。
 *
 * 注意：输出数组的顺序在不同的JS运行环境可能不一致。
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj 需要转换的对象
 * @return {Array} 对所有属性和原型链上属性转换后的键值对数组
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */
module.exports = _curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});
