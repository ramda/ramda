var _compose = require('./internal/_compose');
var _createComposer = require('./internal/_createComposer');


/**
 * Creates a new function that runs each of the functions supplied as parameters in turn,
 * passing the return value of each function invocation to the next function invocation,
 * beginning with whatever arguments were passed to the initial invocation.
 *
 * Note that `compose` is a right-associative function, which means the functions provided
 * will be invoked in order from right to left. In the example `var h = compose(f, g)`,
 * the function `h` is equivalent to `f( g(x) )`, where `x` represents the arguments
 * originally passed to `h`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (b -> c), (a... -> b)) -> (a... -> z)
 * @param {...Function} functions A variable number of functions.
 * @return {Function} A new function which represents the result of calling each of the
 *         input `functions`, passing the result of each function call to the next, from
 *         right to left.
 * @example
 *
 *      var triple = function(x) { return x * 3; };
 *      var double = function(x) { return x * 2; };
 *      var square = function(x) { return x * x; };
 *      var squareThenDoubleThenTriple = R.compose(triple, double, square);
 *
 *      //≅ triple(double(square(5)))
 *      squareThenDoubleThenTriple(5); //=> 150
 */
module.exports = _createComposer(_compose);
