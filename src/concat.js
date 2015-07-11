var _concat = require('./internal/_concat');
var _curry2 = require('./internal/_curry2');
var _hasMethod = require('./internal/_hasMethod');
var _isArray = require('./internal/_isArray');
var toString = require('./toString');

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
 *
 * @example
 *
 *      R.concat([], []); //=> []
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 */
module.exports = _curry2(function(a, b) {
  if (_isArray(a) && _isArray(b)) {
    return _concat(a, b);
  } else if (_hasMethod('concat', a)) {
    return a.concat(b);
  } else {
    throw new TypeError('Cannot concat ' + toString(a) + ' and ' + toString(b));
  }
});
