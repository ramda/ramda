import _curryN from './_curryN';
import _toPublicName from './_toPublicName';


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
export default function _curry3(fn) {
  return _curryN(3, _toPublicName(fn.name), fn);
}
