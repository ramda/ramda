var _curry1 = require('./internal/_curry1');
var _isGenerator = require('./internal/_isGenerator');
var is = require('./is');


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */
module.exports = _curry1(function length(list) {
  if (_isGenerator(list)) {
    const iter = list();
    let len = 0;
    while (!iter.next().done) {
      len += 1;
    }
    return len;
  } else {
    return list != null && is(Number, list.length) ? list.length : NaN;
  }
});
