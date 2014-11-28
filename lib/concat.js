var _concat = require('./_concat');
var _curry2 = require('./_curry2');
var _hasMethod = require('./_hasMethod');
var _isArray = require('./_isArray');


/**
 * Returns a new list consisting of the elements of the first list followed by the elements
 * of the second.
 *
 * @func
 * @memberOf R
 * @category core
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The first list to merge.
 * @param {Array} list2 The second set to merge.
 * @return {Array} A new array consisting of the contents of `list1` followed by the
 *         contents of `list2`. If, instead of an Array for `list1`, you pass an
 *         object with a `concat` method on it, `concat` will call `list1.concat`
 *         and pass it the value of `list2`.
 * @example
 *
 *      R.concat([], []); //=> []
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 */
module.exports = _curry2(function(set1, set2) {
    if (_isArray(set2)) {
        return _concat(set1, set2);
    } else if (_hasMethod('concat', set1)) {
        return set1.concat(set2);
    } else {
        throw new TypeError("can't concat " + typeof set1);
    }
});
