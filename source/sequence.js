import Z from 'sanctuary-type-classes';

import _curry2 from './internal/_curry2';


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => TypeRep f -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe, [Just(1), Just(2), Just(3)]); //=> Just([1, 2, 3])
 *      R.sequence(Maybe, [Just(1), Just(2), Nothing]); //=> Nothing
 *
 *      R.sequence(Array, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(Array, Nothing);         //=> [Nothing]
 */
var sequence = _curry2(Z.sequence);
export default sequence;
