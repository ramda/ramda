var _curry2 = require('./internal/_curry2');
var ap = require('./ap');
var identity = require('./identity');
var map = require('./map');
var prepend = require('./prepend');
var reduceRight = require('./reduceRight');


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
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */
module.exports = _curry2(function sequence(of, traversable) {
  if (typeof traversable.sequence === 'function') {
    return traversable.sequence(of);
  }

  return typeof traversable['fantasy-land/traverse'] === 'function' ?
    traversable['fantasy-land/traverse'](of, identity) :
    reduceRight(function(x, acc) { return ap(map(prepend, x), acc); },
                of([]),
                traversable);
});
