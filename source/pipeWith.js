import _pipeWith from './internal/_pipeWith';


/**
 * Performs left-to-right function composition using transforming function. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil(Math.pow, R.negate, R.inc)
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)(g, h, i)(...args) = f(i, f(h, f(g, ...args)))
 */
export default function pipeWith() {
  if (arguments.length !== 1) {
    throw new Error('pipeWith requires exactly one transforming function');
  }

  return _pipeWith(arguments[0]);
}
