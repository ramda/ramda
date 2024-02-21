import applyTo from './applyTo.js';
import tail from './tail.js';

/**
 * Pipe the value of an expression into a pipeline of functions by performing
 * left-to-right serial function composition.
 * The first argument is the seed value;
 * the remaining arguments must be unary functions.
 *
 * In some libraries this function is named `pipe`.
 *
 * @func
 * @memberOf R
 * @since v0.30.0
 * @category Function
 * @sig (a, (a → b), …, (y → z)) → z
 * @param {*} a The seed value
 * @param {...Function} functions
 * @return {*} z The result of the function pipeline
 * @see R.pipe
 * @example
 *
 *      const m2 = R.flow(9, Math.sqrt, R.negate, R.inc); //=> -2
 */
export default function flow() {
  if (arguments.length === 0) {
    throw new Error('flow requires at least one argument');
  }
  return tail(arguments).reduce(
    applyTo,
    arguments[0]
  );
}
