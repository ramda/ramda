var _curry3 = require('./internal/_curry3');
var adjust = require('./adjust');
var always = require('./always');

/**
 * Returns a new copy of the array with the element at the
 * provided index replaced with the given value.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @deprecated since v0.15.0
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 */
module.exports = _curry3(function(idx, x, list) {
  return adjust(always(x), idx, list);
});
