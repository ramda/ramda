var _composeP = require('./internal/_composeP');
var _createComposer = require('./internal/_createComposer');


/**
 * Similar to `compose` but with automatic handling of promises (or, more
 * precisely, "thenables"). The behavior is identical  to that of
 * compose() if all composed functions return something other than
 * promises (i.e., objects with a .then() method). If one of the function
 * returns a promise, however, then the next function in the composition
 * is called asynchronously, in the success callback of the promise, using
 * the resolved value as an input. Note that `composeP` is a right-
 * associative function, just like `compose`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (b -> c), (a... -> b)) -> (a... -> z)
 * @param {...Function} functions A variable number of functions.
 * @return {Function} A new function which represents the result of calling each of the
 *         input `functions`, passing either the returned result or the asynchronously
 *         resolved value) of each function call to the next, from right to left.
 * @example
 *
 *      var Q = require('q');
 *      var triple = function(x) { return x * 3; };
 *      var double = function(x) { return x * 2; };
 *      var squareAsync = function(x) { return Q.when(x * x); };
 *      var squareAsyncThenDoubleThenTriple = R.composeP(triple, double, squareAsync);
 *
 *      //≅ squareAsync(5).then(function(x) { return triple(double(x)) };
 *      squareAsyncThenDoubleThenTriple(5)
 *        .then(function(result) {
 *          // result is 150
 *        });
 */
module.exports = _createComposer(_composeP);
