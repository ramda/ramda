import _curry1 from './internal/_curry1.js';
import _isString from './internal/_isString.js';

/**
 * The upper first case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.30.2
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper first case.
 * @return {String} The upper first case version of `str`.
 * @see R.lowerFirst
 * @example
 *
 *      R.upperFirst('javascript'); //=> 'Javascript'
 */


var upperFirst =  _curry1(function upperFirst(str) {
  return _isString(str) ? str.charAt(0).toUpperCase() + str.slice(1) : '';
});

export default upperFirst;
