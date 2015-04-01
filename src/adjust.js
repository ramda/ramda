var _concat = require('./internal/_concat');
var _curry3 = require('./internal/_curry3');
var _eq = require('./internal/_eq');


/**
 * Applies a function to the value at the given index of an array,
 * returning a new copy of the array with the element at the given
 * index replaced with the result of the function application.
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
  var oldVal, newVal, _idx, _list;

  if (idx >= list.length || idx < -list.length) {
    return list;
  }

  _idx = idx < 0 ? idx + list.length : idx;
  oldVal = list[_idx];
  newVal = fn(oldVal);

  if (_eq(oldVal, newVal)) {
    return list;
  } else {
    _list = _concat(list);
    _list[_idx] = fn(list[_idx]);
    return _list;
  }
});
