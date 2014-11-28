var _contains = require('./_contains');
var _curry2 = require('./_curry2');
var _filter = require('./_filter');
var flip = require('./flip');
var uniq = require('./uniq');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
 *
 * @func
 * @memberOf R
 * @category relation
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @see R.intersectionWith
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */
module.exports = _curry2(function intersection(list1, list2) {
    return uniq(_filter(flip(_contains)(list1), list2));
});
