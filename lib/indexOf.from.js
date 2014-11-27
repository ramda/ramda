/**
 * Returns the position of the first occurrence of an item (by strict equality) in
 * an array, or -1 if the item is not included in the array. However,
 * `indexOf.from` will only search the tail of the array, starting from the
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
 *      R.indexOf.from(3, 2, [-1,0,1,2,3,4]); //=> 4
 *      R.indexOf.from(10, 2, [1,2,3,4]); //=> -1
 */
R.indexOf.from = _curry3(function indexOfFrom(target, fromIdx, list) {
    return _indexOf(list, target, fromIdx);
});
