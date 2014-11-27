/**
 *
 * A function wrapping calls to the two functions in an `&&` operation, returning `true` or `false`.  Note that
 * this is short-circuited, meaning that the second function will not be invoked if the first returns a false-y
 * value.
 *
 * @func
 * @memberOf R
 * @category logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and ANDs their outputs together.
 * @example
 *
 *      var gt10 = function(x) { return x > 10; };
 *      var even = function(x) { return x % 2 === 0 };
 *      var f = R.and(gt10, even);
 *      f(100); //=> true
 *      f(101); //=> false
 */
R.and = _curry2(function and(f, g) {
    return function _and() {
        return f.apply(this, arguments) && g.apply(this, arguments);
    };
});
