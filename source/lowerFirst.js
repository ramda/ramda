import _curry1 from './internal/_curry1.js';
import _isString from './internal/_isString.js';

/**
 * Converts the first character of string to lower case.
 *
 * @func
 * @memberOf R
 * @since v0.30.2
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower first case.
 * @return {String} The lower first case version of `str`.
 * @see R.upperFirst
 * @example
 *
 *      R.lowerFirst('Javascript'); //=> 'javascript'
 */


var lowerFirst =  _curry1(function lowerFirst(str) {
  return _isString(str) ? str.charAt(0).toLowerCase() + str.slice(1) : '';
});

export default lowerFirst;
