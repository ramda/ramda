import pipeSome from './pipeSome';
import reverse from './reverse';


/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary. If any function in composition
 * returns null, no remaining functions will be called.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeSome, R.pipe
 * @example
 *
 *      const f = R.pipeSome(R.inc, R.ifElse(isOdd, R.identity, R.always(null)), parseInt);
 *
 *      f('1'); // 2
 *      f('2'); // null
 * @symb R.composeSome(f, g, h)(a, b) = f(g(h(a, b)))
 */
export default function composeSome() {
  if (arguments.length === 0) {
    throw new Error('composeSome requires at least one argument');
  }
  return pipeSome.apply(this, reverse(arguments));
}
