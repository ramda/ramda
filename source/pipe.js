import _arity from './internal/_arity';
import _isFunction from './internal/_isFunction';
import _pipe from './internal/_pipe';
import reduce from './reduce';
import tail from './tail';
import toString from './toString';


/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 * @symb R.pipe(f, g, h)(a)(b) = h(g(f(a)))(b)
 */
export default function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  var args = [].slice.call(arguments);
  var idx = 0;
  while (idx < args.length) {
    if (!_isFunction(args[idx])) {
      throw new TypeError(
        'pipe: ' + toString(args[idx]) + ' is not a function'
      );
    }
    idx += 1;
  }
  return _arity(
    arguments[0].length,
    reduce(_pipe, arguments[0], tail(arguments))
  );
}
