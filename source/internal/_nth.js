import _isString from './_isString.js';

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @sig (Number, [a]) -> a | Undefined
 * @sig (Number, String) -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      nth(1, list); //=> 'bar'
 *      nth(-1, list); //=> 'quux'
 *      nth(-99, list); //=> undefined
 *
 *      nth(2, 'abc'); //=> 'c'
 *      nth(3, 'abc'); //=> ''
 * @symb nth(-1, [a, b, c]) = c
 * @symb nth(0, [a, b, c]) = a
 * @symb nth(1, [a, b, c]) = b
 */
function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
}
export default nth;
