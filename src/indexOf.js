var _curry2 = require('./internal/_curry2');
var _indexOf = require('./internal/_indexOf');


/**
 * Returns the position of the first occurrence of an item in an array
 * (by strict equality),
 * or -1 if the item is not included in the array.
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
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */
module.exports = _curry2(function indexOf(target, list) {
  return _indexOf(list, target);
});
