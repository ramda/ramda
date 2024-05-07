import applyTo from './applyTo.js';
import _curry2 from './internal/_curry2.js';
import _reduce from './internal/_reduce.js';

/**
 * Takes the value of an expression and applies it to a function
 * which is the left-to-right serial composition of the functions
 * given in the second argument.
 *
 * The functions in the pipeline should be unary functions.
 *
 * `flow` is helps to avoid introducing an extra function with named arguments
 * for computing the result of a function pipeline which depends on given initial values.
 * Rather than defining a referential transparent function `f = (_x, _y) => R.pipe(g(_x), h(_y), …)`
 * which is only later needed once `z = f(x, y)`,
 * the introduction of `f`, `_x` and `_y` can be avoided: `z = flow(x, [g, h(y),…]`
 *
 * In some libraries this function is named `pipe`.
 *
 * @func
 * @memberOf R
 * @since v0.30.0
 * @category Function
 * @sig a → [(a → b), …, (y → z)] → z
 * @param {*} a The seed value
 * @param {Array<Function>} pipeline functions composing the pipeline
 * @return {*} z The result of applying the seed value to the function pipeline
 * @see R.pipe
 * @example
 *      R.flow(9, [Math.sqrt, R.negate, R.inc]); //=> -2
 *
 *      const personObj = { first: 'Jane', last: 'Doe' };
 *      const fullName = R.flow(personObj, [R.values, R.join(' ')]); //=> "Jane Doe"
 *      const givenName = R.flow('    ', [R.trim, R.when(R.isEmpty, R.always(fullName))]); //=> "Jane Doe"
 */
var flow = _curry2(function flow(seed, pipeline) {
  return _reduce(applyTo, seed, pipeline);
});

export default flow;
