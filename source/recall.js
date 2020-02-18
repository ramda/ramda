import uncurryN from './uncurryN';

/**
 * Collapses a high-order unary function. The order N of the function
 * is implicit. A maximum number of N values are singularly fed.
 *
 * @func
 * @category Function
 * @sig ((a -> b -> * -> c), *...) -> d
 * @param {Function} fn The N-order function to be collapsed.
 * @param {...*} args Up to N input values.
 * @return {*}
 * @see R.call
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      const f = R.compose(R.find, R.propEq('a'));
 *      R.recall(f, 2, xs); //=> {"a": 2}
 *
 * @symb R.recall(f, a, b) = f(a)(b)
 */
var recall = uncurryN(2, function(fn) {
  return function() {
    var numArgs = arguments.length;
    var value = fn;
    var i = 0;
    while (typeof value == 'function' && i < numArgs) {
      value = value(arguments[ i ]);
      i = i + 1;
    }
    return value;
  };
});

export default recall;
