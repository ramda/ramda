var curryN = require('./curryN');


/**
 * Creates a new version of `fn` that, when invoked, will return either:
 * - A new function ready to accept one or more of `fn`'s remaining arguments, if all of
 * `fn`'s expected arguments have not yet been provided
 * - `fn`'s result if all of its expected arguments have been provided
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = function(a, b, c, d) {
 *        return a + b + c + d;
 *      };
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4);//=> 10
 */
module.exports = function curry(fn) {
    return curryN(fn.length, fn);
};
