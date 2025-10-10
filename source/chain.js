import _curry2 from './internal/_curry2.js';
import _chain from './internal/_chain.js';


/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 * This can be used in a Reader monad pipeline, to pass the environment value as second argument into that function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 *
 *      // withSumInKey :: string → {number} → {number}
 *      withSumInKey = key => R.flow(
 *        R.of(Function, key),    // :: Reader {number} string
 *        [R.chain(R.dissoc),
 *        R.map(R.o(R.sum, R.values)),
 *        R.chain(R.assoc(key))]
 *      );
 *      withSumInKey('baz')({foo: 10, bar: 20, baz: 50}); //=>{"foo":10,"bar":20,"baz":30}
 */
var chain = _curry2(_chain);
export default chain;
