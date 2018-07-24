import _curry2 from './internal/_curry2';
import _dispatchable from './internal/_dispatchable';
import _xtakeLast from './internal/_xtakeLast';
import drop from './drop';


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * Dispatches to `takeLast`, `drop`, or `slice` method of the second argument, if present.
 *
 * Returns a non-iterator iterable if a non-array iterable is given in list position.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */
const takeLast = _curry2(_dispatchable(['takeLast'], _xtakeLast, function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
}));
export default takeLast;
