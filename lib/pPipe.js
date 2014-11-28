var pCompose = require('./pCompose');
var reverse = require('./reverse');


/**
 * Creates a new function that runs each of the functions supplied as parameters in turn,
 * passing to the next function invocation either the value returned by the previous
 * function or the resolved value if the returned value is a promise. In other words,
 * if some of the functions in the sequence return promises, `pPipe` pipes the values
 * asynchronously. If none of the functions return promises, the behavior is the same as
 * that of `pipe`.
 *
 * `pPipe` is the mirror version of `pCompose`. `pPipe` is left-associative, which means that
 * each of the functions provided is executed in order from left to right.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((a... -> b), (b -> c), ..., (x -> y), (y -> z)) -> (a... -> z)
 * @param {...Function} functions A variable number of functions.
 * @return {Function} A new function which represents the result of calling each of the
 *         input `functions`, passing either the returned result or the asynchronously
 *         resolved value) of each function call to the next, from left to right.
 * @example
 *
 *      var Q = require('q');
 *      var triple = function(x) { return x * 3; };
 *      var double = function(x) { return x * 2; };
 *      var squareAsync = function(x) { return Q.when(x * x); };
 *      var squareAsyncThenDoubleThenTriple = R.pPipe(squareAsync, double, triple);
 *
 *      //≅ squareAsync(5).then(function(x) { return triple(double(x)) };
 *      squareAsyncThenDoubleThenTriple(5)
 *          .then(function(result) {
 *              // result is 150
 *          });
 */
module.exports = function pPipe() {
    return pCompose.apply(this, reverse(arguments));
};
