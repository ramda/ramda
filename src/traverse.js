var _curry3 = require('./internal/_curry3');
var map = require('./map');
var sequence = require('./sequence');


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since 0.19.1
 * @since 0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      R.traverse(Maybe.of, R.negate, [Just(1), Just(2), Just(3)]);   //=> Just([-1, -2, -3])
 *      R.traverse(Maybe.of, R.negate, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.traverse(R.of, R.negate, Just([1, 2, 3])); //=> [Just(-1), Just(-2), Just(-3)]
 *      R.traverse(R.of, R.negate, Nothing());       //=> [Nothing()]
 */
module.exports = _curry3(function traverse(of, f, traversable) {
  return sequence(of, map(f, traversable));
});
