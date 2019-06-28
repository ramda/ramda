import _curry1 from './internal/_curry1';
import _isArray from './internal/_isArray';
import always from './always';
import apply from './apply';
import curryN from './curryN';
import max from './max';
import pluck from './pluck';
import reduce from './reduce';
import keys from './keys';
import values from './values';


// Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map
function mapValues(fn, obj) {
  return _isArray(obj)
    ? obj.map(fn)
    : keys(obj).reduce(function(acc, key) {
      acc[key] = fn(obj[key]);
      return acc;
    }, {});
}

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        list: [R.add, 'value']
 *        sum: R.add,
 *        some: 'value',
 *        nested: { mul: R.multiply, any: 'value' }
 *      });
 *      getMetrics(2, 4); // =>  {  list: [6, 'value'], sum: 6, some: 'value', nested: { mul: 8, any: 'value' } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */
var applySpec = _curry1(function applySpec(spec) {
  spec = mapValues(
    function(v) {
      return typeof v === 'function' ? v : typeof v === 'object' ? applySpec(v) : always(v);
    },
    spec
  );

  return curryN(
    reduce(max, 0, pluck('length', values(spec))),
    function() {
      var args = arguments;
      return mapValues(function(f) { return apply(f, args); }, spec);
    });
});
export default applySpec;
