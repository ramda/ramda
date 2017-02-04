var _curry2 = require('./internal/_curry2');


/**
 * 执行一个函数`n`次，返回函数执行结果的数组。
 *
 * `fn`接收的参数是从`0`递增到`n-1`的值。
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn 需要执行的函数，接收的参数是`n`
 * @param {Number} n 从`0`到`n - 1`的值，每次函数调用后递增1
 * @return {Array} `fn`执行结果的数组
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */
module.exports = _curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});
