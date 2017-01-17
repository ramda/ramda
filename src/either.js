var _curry2 = require('./internal/_curry2');
var _isFunction = require('./internal/_isFunction');
var lift = require('./lift');
var or = require('./or');


/**
 *
 * 返回由 `||` 运算符连接的两个函数的包装函数，如果两个函数中任一函数的执行结果为真值，则返回 `true` ，
 * 否则，返回 `false` 。注意，这个是短路表达式，意味着如果第一个函数返回真值的话，第二个函数将不会执行。
 *
 * 除了函数之外， `R.either` 也接受任何符合 `fantasy-land` 标准的 `applicative functor` 。
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */
module.exports = _curry2(function either(f, g) {
  return _isFunction(f) ?
    function _either() {
      return f.apply(this, arguments) || g.apply(this, arguments);
    } :
    lift(or)(f, g);
});
