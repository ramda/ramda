import Z from 'sanctuary-type-classes';

import _curry2 from './internal/_curry2';
import _dispatchable from './internal/_dispatchable';
import _isPlainObject from './internal/_isPlainObject';
import _xfilter from './internal/_xfilter';
import keys from './keys';


/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> StrMap a -> StrMap a
 * @sig (Applicative f, Foldable f, Monoid (f a)) => (a -> Boolean) -> f a -> f a
 * @sig (Alternative m, Monad m) => (a -> Boolean) -> m a -> m a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */
var filter = _curry2(_dispatchable(['filter'], _xfilter, function(pred, filterable) {
  return (
    _isPlainObject(filterable) ?
      Z.reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys(filterable)) :
    Z.Alternative.test(filterable) && Z.Monad.test(filterable) ?
      Z.filterM(pred, filterable) :
    // else
      Z.filter(pred, filterable)
  );
}));
export default filter;
