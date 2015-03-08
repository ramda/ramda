var _contains = require('./internal/_contains');
var _curry2 = require('./internal/_curry2');


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 */
module.exports = _curry2(function difference(first, second) {
    var result = [];
    for (var idx = 0, len = first.length; idx < len; idx += 1) {
        if (!_contains(first[idx], second) && !_contains(first[idx], result)) {
            result.push(first[idx]);
        }
    }
    return result;
});
