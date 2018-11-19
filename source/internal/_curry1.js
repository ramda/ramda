import _curryN from './_curryN';


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
export default function _curry1(fn) {
  return _curryN(1, '', fn);
}
