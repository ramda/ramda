import _curry1 from './internal/_curry1';
import apply from './apply';
import curryN from './curryN';
import map from './map';
import max from './max';
import pluck from './pluck';
import reduce from './reduce';
import values from './values';


/**
 * Given a spec hierarchy of objects and/or arrays recursively mapping properties/elements
 * to functions, creates a value of the same structure, by mapping each
 * property/element to the result of calling its associated function with
 * the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} | [((a, b, ..., m) -> v)] -> ((a, b, ..., m) -> {k: v} | [v])
 * @param {Object} spec a hierarchy of objects and/or arrays recursively mapping properties/elements
 * to functions for producing the values for these properties/elements.
 * @return {Function} A function that returns a value with the same structure
 * as `spec', with each property/element set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 *
 *      var beforeCurrentAndAfter = R.applySpec([R.add(-1), R.identity, R.add(1)]);
 *      beforeCurrentAndAfter(3); // => [2, 3, 4];
 *
 *      var operations = R.applySpec([
 *        { type: R.always('add'), value: R.add },
 *        { type: R.always('multiply'), value: R.multiply }
 *      ]);
 *      operations(2, 4); // => [ { type: 'add', value: 6 }, { type: 'multiply', value: 8 } ];
 *
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
var applySpec = _curry1(function applySpec(spec) {
  spec = map(function(v) { return typeof v == 'function' ? v : applySpec(v); },
             spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))),
                function() {
                  var args = arguments;
                  return map(function(f) { return apply(f, args); }, spec);
                });
});
export default applySpec;
