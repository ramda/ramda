import _curry3 from './internal/_curry3';
import view from './view';

/**
 * Returns `true` if the property, path, index, the lens focused on, satisfies the given
 * predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.27.1
 * @category Logic
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (a -> Boolean) -> Lens s a -> s -> Boolean
 * @param {Function} pred
 * @param {Lens} lens
 * @param {*} obj
 * @return {Boolean}
 * @see R.lensEq
 * @example
 *
 *      R.lensSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */
var lensSatisfies = _curry3(function lensSatisfies(pred, lens, obj) {
  return pred(view(lens, obj));
});
export default lensSatisfies;
