import _curry2 from './internal/_curry2';
import _isArrayLike from './internal/_isArrayLike';
import _isObject from './internal/_isObject';
import _sequenceArray from './internal/_sequenceArray';
import traverseWithKey from './traverseWithKey';


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Objects and Arrays are both accepted as types of Traversable, otherwise this will
 * dispatch to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse, R.traverseWithKey
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(Maybe.of, { a: Just(1), b: Just(2), c: Just(3) });   //=> Just({a: 1, b: 2, c: 3})
 *      R.sequence(Maybe.of, { a: Just(1), b: Just(2), c: Nothing() }); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */
var sequence = _curry2(function sequence(of, traversable) {
  if (typeof traversable.sequence === 'function') {
    return traversable.sequence(of);
  } else if (_isArrayLike(traversable)) {
    return _sequenceArray(of, traversable);
  } else if (_isObject(traversable)) {
    return traverseWithKey(of, function(v, k) { return v; }, traversable);
  } else {
    throw new TypeError('Unsupported traversable instance');
  }
});
export default sequence;
