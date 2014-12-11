var _concat = require('./internal/_concat');
var _hasMethod = require('./internal/_hasMethod');
var _isArray = require('./internal/_isArray');
var op = require('./op');


/**
 * Returns a new list consisting of the elements of the first list followed by the elements
 * of the second.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The first list to merge.
 * @param {Array} list2 The second set to merge.
 * @return {Array} A new array consisting of the contents of `list1` followed by the
 *         contents of `list2`. If, instead of an Array for `list1`, you pass an
 *         object with a `concat` method on it, `concat` will call `list1.concat`
 *         and pass it the value of `list2`.
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *         be curried right by explicitly passing `R.__` for its first argument.
 *
 * @example
 *
 *      R.concat([], []); //=> []
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *
 *      // operator-style:
 *      R.concat(R.__)([4, 5, 6], [1, 2, 3]); //=> [1, 2, 3, 4, 5, 6]
 *
 */
module.exports = op(function(set1, set2) {
    if (_isArray(set2)) {
        return _concat(set1, set2);
    } else if (_hasMethod('concat', set1)) {
        return set1.concat(set2);
    } else {
        throw new TypeError("can't concat " + typeof set1);
    }
});
