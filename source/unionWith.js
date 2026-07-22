import _concat from './internal/_concat.js';
import _curry3 from './internal/_curry3.js';
import uniqWith from './uniqWith.js';


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements. Prefers the first item
 * if two items compare equal based on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1, b: 1}, {a: 2}];
 *      const l2 = [{a: 1, b: 2}, {a: 3}];
 *      R.unionWith(cmp, l1, l2); //=> [{a: 1, b: 1}, {a: 2}, {a: 3}]
 */
var unionWith = _curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});
export default unionWith;
