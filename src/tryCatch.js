var _arity = require('./internal/_arity');
var _concat = require('./internal/_concat');
var _curry2 = require('./internal/_curry2');


/**
 * `tryCatch`接收`tryer`函数和`catcher`函数，返回一个函数执行`tryer`，如果没有抛出异常则正常返回。
 * 如果`tryer`抛出异常，重新执行`catcher`，然后返回结果。
 * 注意，`tryer`和`catcher`都返回同样类型的结果可以提高效率。
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer 可能抛出异常的函数
 * @param {Function} catcher 接收异常的函数
 * @return {Function} 能够捕获异常然后执行异常处理函数的函数
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */
module.exports = _curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function() {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});
