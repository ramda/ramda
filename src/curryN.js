var _concat = require('./internal/_concat');
var _curry2 = require('./internal/_curry2');
var _noArgsException = require('./internal/_noArgsException');
var arity = require('./arity');


/**
 * Creates a new version of `fn` with given arity that, when invoked,
 * will return either:
 * - A new function ready to accept one or more of `fn`'s remaining arguments, if all of
 * `fn`'s expected arguments have not yet been provided
 * - `fn`'s result if all of its expected arguments have been provided
 *
 * This function is useful in place of `curry`, when the arity of the
 * function to curry cannot be determined from its signature, e.g. if it's
 * a variadic function.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} fnArity The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var addFourNumbers = function() {
 *        return R.sum([].slice.call(arguments, 0, 4));
 *      };
 *
 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4);//=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
    return (function recurry(args) {
        return arity(Math.max(length - (args && args.length || 0), 0), function() {
            if (arguments.length === 0) { throw _noArgsException(); }
            var newArgs = _concat(args, arguments);
            if (newArgs.length >= length) {
                return fn.apply(this, newArgs);
            } else {
                return recurry(newArgs);
            }
        });
    }([]));
});
