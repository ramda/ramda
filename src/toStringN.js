var curry = require('./curry');
var toString = require('./toString');
var map = require('./map');

/**
 * Returns the string representation of the given values. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
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
 *     R.toStringN(new Point(1, 2), new Point(3, 4)); //=> 'new Point(1, 2)new Point(3, 4)'
 *
 * @func
 * @memberOf R
 * @since v0.24.1
 * @category String
 * @sig ...* -> String
 * @param {...*} values
 * @return {String}
 * @see R.toString
 * @example
 *
 *      R.toStringN(42); //=> '42'
 *      R.toStringN(42, 53); //=> '4253'
 *      R.toStringN('a', 'b', 'c'); //=> '"abc"'
 *      R.toStringN([1, 2, 3], [4, 5, 6]); //=> '[1, 2, 3][4, 5, 6]'
 *      R.toStringN({foo: 1}, {bar: 2, baz: 3}); //=> '{"bar": 2}, {"baz": 3, "foo": 1}'
 *      R.toStringN(new Date('2001-02-03T04:05:06Z'), new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")new Date("2001-02-03T04:05:06.000Z")'
 */
module.exports = curry(function toStringN() { return map(toString, arguments).join(); });
