var _noArgsException = require('./internal/_noArgsException');
var _slice = require('./internal/_slice');


/**
 * Takes a function `fn`, which takes a single array argument, and returns
 * a function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, R.unapply derives a variadic function from a function
 * which takes an array. R.unapply is the inverse of R.apply.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 */
module.exports = function unapply(fn) {
    if (arguments.length === 0) {
        throw _noArgsException();
    }
    return function() {
        return fn(_slice(arguments));
    };
};
