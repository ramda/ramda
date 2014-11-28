var _curry2 = require('./_curry2');


/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should
 * be a bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @category core
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn
 * @param {Array} args
 * @return {*}
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 */
module.exports = _curry2(function apply(fn, args) {
    return fn.apply(this, args);
});
