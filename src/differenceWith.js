var _curry3 = require('./internal/_curry3');
var containsWith = require('./containsWith');


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
 * Duplication is determined according to the value returned by applying the supplied predicate to two list
 * elements.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @see R.difference
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @example
 *
 *      function cmp(x, y) { return x.a === y.a; }
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */
module.exports = _curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var containsPred = containsWith(pred);
  while (idx < firstLen) {
    if (!containsPred(first[idx], second) && !containsPred(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});
