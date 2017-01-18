var _curry3 = require('./internal/_curry3');


/**
 * 最后一个输入`x`作为参数传给谓词函数做判断，
 * 如果不满足则将`x`作为参数传给`whenFalseFn`返回结果，否则返回`x`。
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred 谓词函数
 * @param {Function} whenFalseFn 当`pred`返回结果为 false 时执行的函数
 * @param {*} x 作为参数传入`pred`用于判断，如果需要作为参数传入`whenFalseFn`
 * @return {*} `x`或者`whenFalseFn`的执行结果
 * @see R.ifElse, R.when
 * @example
 *
 *      // coerceArray :: (a|[a]) -> [a]
 *      var coerceArray = R.unless(R.isArrayLike, R.of);
 *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
 *      coerceArray(1);         //=> [1]
 */
module.exports = _curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});
