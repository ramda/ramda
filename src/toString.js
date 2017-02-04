var _curry1 = require('./internal/_curry1');
var _toString = require('./internal/_toString');


/**
 * 返回一个值的字符串表现形式。
 * 输出的值执行`eval`结果等价于输入的值。原有的`toString`方法不满足这一要求。
 *
 * 如果输入值是一个`[object Object]`对象，且有不同于`Object.prototype.toString`的`toString`方法，那么将再不传递参数的情况下调用这个方法。
 * 换句话说，在构造函数中自定义的`toString`方法可以满足这个条件，例如：
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */
module.exports = _curry1(function toString(val) { return _toString(val, []); });
