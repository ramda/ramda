import _curryN from './internal/_curryN.js';
import concat from './concat.js';
import fromPairs from './fromPairs.js';
import keys from './keys.js';
import map from './map.js';
import pipe from './pipe.js';
import uniq from './uniq.js';


/**
 * Creates a new list by merging two provided lists based on a merge criteria.
 * The merge criteria key is calculated for each element of each list.
 * It is assumed that each list will produce a unique key for each of its elements.
 * Then a merge function is used to merge the corresponding item of each list
 * into a single object.
 * If a key does not have a corresponding item in one of the lists, undefined is
 * passed to the merge function for the corresponding argument.
 * The result list will be the size of the number of unique keys among the two
 * input lists.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> k) -> ((a?, a?) -> b) -> [a] -> [a] -> [b]
 * @param {Function} mergeCriteria
 * @param {Function} mergeFunction
 * @param {Array} left
 * @param {Array} right
 * @return {Array}
 * @example
 *
 *      R.mergeBy(
 *        R.prop('key'),
 *        (leftItem, rightItem) => ({
 *          key: leftItem?.key ?? rightItem?.key,
 *          leftValue: leftItem?.value ?? 5,
 *          rightValue: rightItem?.value ?? 6
 *        })
 *        [{ key: 'a', value: 1 }, { key: 'b', value: 2 }],
 *        [{ key: 'b', value: 3 }, { key: 'c', value: 4 }]
 *      );
 *      //=> [
 *      //  { key: 'a', leftValue: 1, rightValue: 6 },
 *      //  { key: 'b', leftValue: 2, rightValue: 3 },
 *      //  { key: 'c', leftValue: 5, rightValue: 4 }
 *      //]
 */
 export default _curryN(4, [], (mergeCriteria, mergeFunction, left, right) => {
  const getItemByCriteria = pipe(
      map(item => [mergeCriteria(item), item]),
      fromPairs
  );

  const leftItemByCriteria = getItemByCriteria(left ?? []);
  const rightItemByCriteria = getItemByCriteria(right ?? []);

  const uniqueKeys = uniq(concat(
      keys(leftItemByCriteria),
      keys(rightItemByCriteria)
  ));

  return map(
      key => mergeFunction(leftItemByCriteria[key], rightItemByCriteria[key]),
      uniqueKeys
  );
});
