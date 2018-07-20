import _curry2 from './internal/_curry2.js';
import _filter from './internal/_filter.js';
import _Set from './internal/_Set.js';
import uniq from './uniq.js';


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */
var intersection = _curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  var toKeep = new _Set();

  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }

  for (var i = 0; i < lookupList.length; i += 1) {
    toKeep.add(lookupList[i]);
  }

  return uniq(_filter(toKeep.has.bind(toKeep), filteredList));
});
export default intersection;
