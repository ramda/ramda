var _curry2 = require('./internal/_curry2');
var _isGenerator = require('./internal/_isGenerator');
var _isString = require('./internal/_isString');


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth('abc', 2); //=> 'c'
 *      R.nth('abc', 3); //=> ''
 */
module.exports = _curry2(function nth(offset, list) {
  if (_isGenerator(list)) {
    const iter = list();
    let item;

    for (let i = 0; i <= offset; i += 1) {
      item = iter.next();

      if (item.done) {
        return;
      }
    }

    return item.value;
  } else {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  }
});
