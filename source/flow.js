import applyTo from './applyTo.js';
import _curry2 from './internal/_curry2.js';

/**
 * Takes the value of an expression and applies it to a function
 * which is the left-to-right serial composition of the functions
 * given in the second argument.
 *
 * The functions in the pipeline should be unary functions.
 *
 * `flow` is helps to avoid introducing named functions with named arguments
 * for computing the result of a function pipeline which depends on given initial values.
 * Rather than composing a custom pipeline function `p = (_x, _y) => R.pipe(g(x), h(y), …)`
 * which is only later needed once `z = p(x, y)`,
 * the introduction of `p`, `_x` and `_y` can be avoided: `z = flow(x, [g, h(y),…]`
 *
 * In some libraries this function is named `pipe`.
 *
 * @func
 * @memberOf R
 * @since v0.30.0
 * @category Function
 * @sig (a, [(a → b), …, (y → z)]) → z
 * @param {*} a The seed value
 * @param {Array<Function>} pipeline functions composing the pipeline
 * @return {*} z The result of applying the seed value to the function pipeline
 * @see R.pipe
 * @example
 *      const defaultName = 'Jane Doe';
 *      const savedName = R.flow(localStorage.get('name'), [R.when(R.isNil(defaultName)), R.match(/(.+)\s/), R.nth(0)]);
 *      const givenName = R.flow($givenName.value, [R.trim, R.when(R.isEmpty, R.always(savedName))])
 */
var flow = _curry2(function flow(seed, pipeline) {
  return pipeline.reduce(applyTo, seed);
});

export default flow;
