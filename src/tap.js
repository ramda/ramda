var _curry2 = require('./internal/_curry2');


/**
 * 对一个对象执行一个函数，然后返回这个对象。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn 调用`x`的函数。抛出`fn`的执行结果。
 * @param {*} x
 * @return {*} `x`
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */
module.exports = _curry2(function tap(fn, x) {
  fn(x);
  return x;
});
