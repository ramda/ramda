import _curry2 from './internal/_curry2.js';
import ap from './ap.js';
import map from './map.js';
import prepend from './prepend.js';
import reduceRight from './reduceRight.js';
import identity from './internal/_identity.js';
import _isArray from './internal/_isArray.js';
import toPairs from './toPairs.js';
import _assoc from './internal/_assoc.js';


/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Also accepts `Object` as the Traversable to aid working with [dictionaries](https://github.com/ramda/ramda/wiki/Type-Signatures#simple-objects) (Objects of like-typed values).
 *
 * Dispatches to the `"fantasy-land/traverse"` or the `traverse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig fantasy-land/of :: TypeRep f => f ~> a -> f a
 * @sig (Applicative f, Traversable t) => TypeRep f -> t (f a) -> f (t a)
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Object|Function} TypeRepresentative with an `of` or `fantasy-land/of` method
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(Maybe.of, {a: Just(1), b: Just(2), c: Just(3)}); //=> Just({a: 1, b: 2, c: 3})
 *
 *      R.sequence(R.of(Array), Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of(Array), Nothing());       //=> [Nothing()]
 */
var sequence = _curry2(function sequence(F, traversable) {
  var of = typeof F['fantasy-land/of'] === 'function'
    ? F['fantasy-land/of']
    : typeof F.of === 'function'
      ? F.of
      : F;
  var TypeRep = { 'fantasy-land/of': of };

  return (
    typeof traversable['fantasy-land/traverse'] === 'function'
      ? traversable['fantasy-land/traverse'](TypeRep, identity)
      : typeof traversable.traverse === 'function'
        ? traversable.traverse(TypeRep, identity)
        : _isArray(traversable)
          ? reduceRight(
            function(x, acc) {
              return ap(map(prepend, x), acc);
            },
            of([]),
            traversable
          )
          : reduceRight(
            function(kvPair, acc) {
              return ap(map(
                function(v) {
                  return function(obj) {
                    return _assoc(kvPair[0], v, obj);
                  };
                },
                kvPair[1]
              ),
              acc);
            },
            of({}),
            toPairs(traversable)
          )
  );
});
export default sequence;
