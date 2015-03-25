var _composeL = require('./internal/_composeL');

/**
 * Creates a new lens that allows getting and setting values of nested properties, by
 * following each given lens in succession.
 *
 * Note that `composeL` is a right-associative function, which means the lenses provided
 * will be invoked in order from right to left.
 *
 * @func
 * @memberOf R
 * @category Function
 * @see R.lens
 * @sig ((y -> z), (x -> y), ..., (b -> c), (a -> b)) -> (a -> z)
 * @param {...Function} lenses A variable number of lenses.
 * @return {Function} A new lens which represents the result of calling each of the
 *         input `lenses`, passing the result of each getter/setter as the source
 *         to the next, from right to left.
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *      var secondLens = R.lensIndex(1);
 *      var xLens = R.lensProp('x');
 *      var secondOfXOfHeadLens = R.composeL(secondLens, xLens, headLens);
 *
 *      var source = [{x: [0, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}];
 *      secondOfXOfHeadLens(source); //=> 1
 *      secondOfXOfHeadLens.set(123, source); //=> [{x: [0, 123], y: [2, 3]}, {x: [4, 5], y: [6, 7]}]
 */
module.exports = function() {
  var idx = arguments.length - 1;
  var fn = arguments[idx];
  while (--idx >= 0) {
    fn = _composeL(arguments[idx], fn);
  }
  return fn;
};
