import _curry2 from './internal/_curry2.js';
import _lens from './internal/_lens.js';
import nAry from './nAry.js';


/**
 * Returns a lens for the given isomorphic function pairs `to` and `from`.
 * Where we go source `to` focus, then backwards source `from` focus.
 * The function pairs should never loose data between the structure mappings
 *
 * @func
 * @memberOf R
 * @since v0.31.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> (a -> s) -> Lens s a
 * @param {Function} to
 * @param {Function} from
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lens
 * @example
 *
 *      const xJson = lensIso(JSON.parse, JSON.stringify);
 *
 *      R.view(xJson, '{"x": 4, "y": 2}'); //=> {x: 4, y: 2}
 *      R.set(xJson, {x: 4, y: 10 }, '{"x": 4, "y": 2}'); //=> '{"x": 4, "y": 10}'
 *      R.over(xJson, R.assoc('x', 6), '{"x": 4,"y": 2}'); //=> '{"x": 6 ,"y": 2}'
 */
var lensIso = _curry2(function lensIso(to, from) {
  return _lens(to, nAry(1, from));
});
export default lensIso;
