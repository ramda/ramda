import _curry1 from './internal/_curry1.js';
import _nth from './internal/_nth.js';
import lens from './lens.js';
import update from './update.js';


/**
 * Returns a lens whose focus is the specified index.
 *
 * When `idx < -list.length || idx >= list.length`, `R.set` or `R.over`, the original list is returned.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over, R.nth
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 *
 *      // out-of-range returns original list
 *      R.set(R.lensIndex(3), 'x', ['a', 'b', 'c']);         //=> ['a', 'b', 'c']
 *      R.over(R.lensIndex(-4), R.toUpper, ['a', 'b', 'c']); //=> ['a', 'b', 'c']
 */
var lensIndex = _curry1(function lensIndex(n) {
  return lens(
    function(val) { return _nth(n, val);},
    update(n)
  );
});
export default lensIndex;
