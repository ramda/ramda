var _curry3 = require('./_curry3');
var _lastIndexOf = require('./_lastIndexOf');


/**
 * Returns the position of the last occurrence of an item (by strict equality) in
 * an array, or -1 if the item is not included in the array. However,
 * `lastIndexOf.from` will only search the tail of the array, starting from the
 * `fromIdx` parameter.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> Number -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} list The array to search in.
 * @param {Number} fromIdx the index to start searching from
 * @return {Number} the index of the target, or -1 if the target is not found.
 *
 * @example
 *
 *      R.lastIndexOf.from(3, 2, [-1,3,3,0,1,2,3,4]); //=> 2
 *      R.lastIndexOf.from(10, 2, [1,2,3,4]); //=> -1
 */
module.exports = _curry3(function lastIndexOfFrom(target, fromIdx, list) {
    return _lastIndexOf(list, target, fromIdx);
});
