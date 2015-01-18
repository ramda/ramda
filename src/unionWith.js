var _concat = require('./internal/_concat');
var _curry3 = require('./internal/_curry3');
var uniqWith = require('./uniqWith');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
 * determined according to the value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      > var cmp = function(x, y) { return x.a === y.a; }
 *      > R.unionWith(cmp, [{a: 1}, {a: 2}], [{a: 1}, {a: 4}])
 *      [{a: 1}, {a: 2}, {a: 4}]
 */
module.exports = _curry3(function unionWith(pred, list1, list2) {
    return uniqWith(pred, _concat(list1, list2));
});
