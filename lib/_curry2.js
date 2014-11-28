var _noArgsException = require('./_noArgsException');


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 * @example
 *
 *      var addTwo = function(a, b) {
 *        return a + b;
 *      };
 *
 *      var curriedAddTwo = _curry2(addTwo);
 */
module.exports = function _curry2(fn) {
    return function(a, b) {
        switch (arguments.length) {
            case 0:
                throw _noArgsException();
            case 1:
                return function(b) {
                    return fn(a, b);
                };
            default:
                return fn(a, b);
        }
    };
};
