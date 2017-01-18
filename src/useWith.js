var _curry2 = require('./internal/_curry2');
var curryN = require('./curryN');


/**
 * 输入一个函数`fn`和一个 transformer 函数的集合，返回一个柯里化函数。
 * 调用返回的函数会对每个参数执行对应的 transformer 函数，然后作为新的参数传入 `fn` 执行。
 *
 * 如果传的参数数量比 transformer 函数的数量多，多出的参数会被直接传入`fn`。
 * 如果不需要处理多出的那部分参数，除了忽略之外，也可以用 identity 函数来作为 transformer ，以保证返回函数的参数数量是确定的。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */
module.exports = _curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function() {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
