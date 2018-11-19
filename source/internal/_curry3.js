import _curryN from './_curryN';


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
export default function _curry3(fn) {
  return _curryN(3, '', fn);
}
