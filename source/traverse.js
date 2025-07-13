import _curry3 from './internal/_curry3.js';
import map from './map.js';
import sequence from './sequence.js';


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * Also accepts `Object` as the Traversable to aid working with [dictionaries](https://github.com/ramda/ramda/wiki/Type-Signatures#simple-objects) (Objects of like-typed values).
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig fantasy-land/of :: TypeRep f => f ~> a -> f a
 * @sig (Applicative f, Traversable t) => TypeRep f -> (a -> f b) -> t a -> f (t b)
 * @sig (Applicative f, Traversable t) => (b -> f b) -> (a -> f b) -> t a -> f (t b)
 * @param {Object|Function} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Maybe.Nothing` if the given divisor is `0`
 *      const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 *
 *      R.traverse(Maybe.of, safeDiv(10), {a: 2, b: 4}); //=> Maybe.Just({a: 5, b: 2.5})
 *
 *      // Using a Type Representative
 *      R.traverse(Maybe, safeDiv(10), Right(4)); //=> Just(Right(2.5))
 *      R.traverse(Maybe, safeDiv(10), Right(0)); //=> Nothing
 *      R.traverse(Maybe, safeDiv(10), Left("X")); //=> Just(Left("X"))
 */
var traverse = _curry3(function traverse(F, f, traversable) {
  var of = typeof F['fantasy-land/of'] === 'function'
    ? F['fantasy-land/of']
    : typeof F.of === 'function'
      ? F.of
      : F;
  var TypeRep = { 'fantasy-land/of': of };

  return (
    typeof traversable['fantasy-land/traverse'] === 'function'
      ? traversable['fantasy-land/traverse'](TypeRep, f)
      : typeof traversable.traverse === 'function'
        ? traversable.traverse(TypeRep, f)
        : sequence(TypeRep, map(f, traversable))
  );
});
export default traverse;
