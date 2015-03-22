var apply = require('./apply');
var compose = require('./compose');
var composeL = require('./composeL');
var reverse = require('./reverse');
var unapply = require('./unapply');

/**
 * Creates a new lens that allows getting and setting values of nested properties, by
 * following each given lens in succession.
 *
 * `pipeL` is the mirror version of `composeL`. `pipeL` is left-associative, which means that
 * each of the functions provided is executed in order from left to right.
 *
 * @func
 * @memberOf R
 * @category Function
 * @see R.lens
 * @sig ((a -> b), (b -> c), ..., (x -> y), (y -> z)) -> (a -> z)
 * @param {...Function} lenses A variable number of lenses.
 * @return {Function} A new lens which represents the result of calling each of the
 *         input `lenses`, passing the result of each getter/setter as the source
 *         to the next, from right to left.
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *      var secondLens = R.lensIndex(1);
 *      var xLens = R.lensProp('x');
 *      var headThenXThenSecondLens = R.pipeL(headLens, xLens, secondLens);
 *
 *      var source = [{x: [0, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}];
 *      headThenXThenSecondLens(source); //=> 1
 *      headThenXThenSecondLens.set(123, source); //=> [{x: [0, 123], y: [2, 3]}, {x: [4, 5], y: [6, 7]}]
 */
module.exports = compose(apply(composeL), unapply(reverse));
