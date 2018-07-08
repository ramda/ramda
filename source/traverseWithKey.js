import _curry3 from './internal/_curry3';
import _sequenceArray from './internal/_sequenceArray';
import keys from './keys';
import map from './map';
import zipObj from './zipObj';


/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over the keys and values of an Object, then constructs a new Object within the
 * Applicative consisting of each returned Applicative value.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig Applicative f => (a -> f a) -> ((a, k) -> f b) -> {a} -> f {b}
 * @param {Function} of
 * @param {Function} f
 * @param {*} obj
 * @return {*}
 * @see R.sequence, R.traverse
 * @example
 *
 *      const allValid = (v, k) => k.length >= 3 && v > 0 ? Just(v) : Nothing();
 *
 *      R.traverseWithKey(Maybe.of, allValid, { a: 1, b: 2, c: 3 }); //=> Nothing
 *      R.traverseWithKey(Maybe.of, allValid, { foo: 0, bar: 1, baz: 2 }); //=> Nothing
 *      R.traverseWithKey(Maybe.of, allValid, { foo: 1, bar: 2, baz: 3 }); //=> Just({ foo: 1, bar: 2, baz: 3 })
 */
var traverseWithKey = _curry3(function traverseWithKey(of, f, obj) {
  var ks = keys(obj).sort();
  var fxs = _sequenceArray(of, map(function(k) { return f(obj[k], k); }, ks));
  return map(zipObj(ks), fxs);
});
export default traverseWithKey;
