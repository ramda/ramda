import _arity from './internal/_arity';
import _pipeSome from './internal/_pipeSome';
import reduce from './reduce';
import tail from './tail';


/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary. If any function in composition
 * returns null, no remaining functions will be called.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.pipe, R.compose, R.composeSome
 * @example
 *
 *      const f = R.pipeSome(parseInt, R.ifElse(isOdd, R.identity, R.always(null)), R.inc);
 *
 *      f('1'); // 2
 *      f('2'); // null
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */
export default function pipeSome() {
  if (arguments.length === 0) {
    throw new Error('pipeSome requires at least one argument');
  }
  return _arity(arguments[0].length,
                reduce(_pipeSome, arguments[0], tail(arguments)));
}
