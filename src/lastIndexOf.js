var _curry2 = require('./internal/_curry2');
var _lastIndexOf = require('./internal/_lastIndexOf');


/**
 * Returns the position of the last occurrence of an item (by strict equality) in
 * an array, or -1 if the item is not included in the array.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} list The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 *
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */
module.exports = _curry2(function lastIndexOf(target, list) {
  return _lastIndexOf(list, target);
});
