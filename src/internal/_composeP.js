var _isThenable = require('./_isThenable');
var _meta = require('./_meta');

/**
 * A right-associative two-argument composition function like `_compose`
 * but with automatic handling of promises (or, more precisely,
 * "thenables"). This function is used to construct a more general
 * `composeP` function, which accepts any number of arguments.
 *
 * @private
 * @category Function
 * @param {Function} f A function.
 * @param {Function} g A function.
 * @return {Function} A new function that is the equivalent of `f(g(x))`.
 * @example
 *
 *      var Q = require('q');
 *      var double = function(x) { return x * 2; };
 *      var squareAsync = function(x) { return Q.when(x * x); };
 *      var squareAsyncThenDouble = _composeP(double, squareAsync);
 *
 *      squareAsyncThenDouble(5)
 *          .then(function(result) {
 *            // the result is now 50.
 *          });
 */
module.exports = function _composeP(f, g) {
    return _meta.set(function() {
        var context = this;
        var value = g.apply(this, arguments);
        if (_isThenable(value)) {
            return value.then(function(result) {
                return f.call(context, result);
            });
        } else {
            return f.call(this, value);
        }
    }, g);
};
