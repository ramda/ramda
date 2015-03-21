var compose = require('./compose');
var reverse = require('./reverse');


/**
 * Creates a new function that runs each of the functions supplied as parameters in turn,
 * passing the return value of each function invocation to the next function invocation,
 * beginning with whatever arguments were passed to the initial invocation.
 *
 * `pipe` is the mirror version of `compose`. `pipe` is left-associative, which means that
 * each of the functions provided is executed in order from left to right.
 *
 * In some libraries this function is named `sequence`.
 * @func
 * @memberOf R
 * @category Function
 * @sig ((a... -> b), (b -> c), ..., (x -> y), (y -> z)) -> (a... -> z)
 * @param {...Function} functions A variable number of functions.
 * @return {Function} A new function which represents the result of calling each of the
 *         input `functions`, passing the result of each function call to the next, from
 *         left to right.
 * @example
 *
 *      var triple = function(x) { return x * 3; };
 *      var double = function(x) { return x * 2; };
 *      var square = function(x) { return x * x; };
 *      var squareThenDoubleThenTriple = R.pipe(square, double, triple);
 *
 *      //≅ triple(double(square(5)))
 *      squareThenDoubleThenTriple(5); //=> 150
 */
module.exports = function pipe() {
  return compose.apply(this, reverse(arguments));
};
