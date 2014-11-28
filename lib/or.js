var _curry2 = require('./_curry2');


/**
 * A function wrapping calls to the two functions in an `||` operation, returning `true` or `false`.  Note that
 * this is short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
 * value.
 *
 * @func
 * @memberOf R
 * @category logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and ORs their outputs together.
 * @example
 *
 *      var gt10 = function(x) { return x > 10; };
 *      var even = function(x) { return x % 2 === 0 };
 *      var f = R.or(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */
module.exports = _curry2(function or(f, g) {
    return function _or() {
        return f.apply(this, arguments) || g.apply(this, arguments);
    };
});
