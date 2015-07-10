var _curry3 = require('./internal/_curry3');
var _slice = require('./internal/_slice');

/**
 * Applies a function to the value at the given index of an array,
 * returning a new copy of the array with the element at the given
 * index replaced with the result of the function application.
 * @see R.update
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @example
 *
 *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
 */
module.exports = _curry3(function(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _slice(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
