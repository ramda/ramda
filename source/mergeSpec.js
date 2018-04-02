import _isObject from './internal/_isObject';
import _curry1 from './internal/_curry1';
import apply from './apply';
import curryN from './curryN';
import map from './map';
import max from './max';
import merge from './merge';
import pluck from './pluck';
import reduce from './reduce';
import values from './values';

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 * Nearly identical to [applySpec()](http://ramdajs.com/docs/#applySpec) with
 * one difference being it passes through any props unaltered on the final object
 * for which no "spec" functions were defined (similar to how
 * [evolve()](https://ramdajs.com/docs/#evolve) passes through any props unaltered
 * that you did not name in the spec).
 *
 * @func
 * @memberOf R
 * @since v0.25.1
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec An object recursively mapping properties to functions for
 *        producing values for these properties
 * @return {Function} A function that returns an object of the same structure
 * as `spec`, with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.applySpec, R.converge, R.juxt
 * @example
 *
 *      const formatUser = R.mergeSpec({
 *        fullName: R.compose(R.join(' '), R.values, R.pick(['firstName', 'lastName'])),
 *        address: R.evolve({
 *          street: R.trim,
 *          city: compose(function(str) { return str.replace(/(?:^|\s)\S/g, R.toUpper) }, R.trim),
 *          state: R.toUpper,
 *          zip: compose(R.trim, R.when(R.is(Number), R.toString))
 *        })
 *      });
 *
 *      formatUser({
 *        firstName: 'Montgomery',
 *        lastName: 'Burns',
 *        address: {
 *          street: '1000 Mammon Lane, ',
 *          city: 'springfield',
 *          state: 'or',
 *          zip: 97403
 *        }
 *      }); // => { firsName: 'Montgomery', lastName: 'Burns', fullName: 'Montgomery Burns', address: { street: '1000 Mammon Lane,', city: 'Springfield', state: 'OR', zip: '97403' } }
 */
var mergeSpec = _curry1(function mergeSpec(spec) {
  spec = map(function(v) { return typeof v == 'function' ? v : mergeSpec(v); },
             spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))),
                function() {
                  var args = arguments;
                  if (args.length === 1 && _isObject(args[0])) {
                    return merge(args[0], map(function(f) { return apply(f, args); }, spec));
                  }
                  return map(function(f) { return apply(f, args); }, spec);
                });
});
export default mergeSpec;
