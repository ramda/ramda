import _curry1 from './internal/_curry1.js';
import _isString from './internal/_isString.js';
import compose from './compose.js';
import toLower from './toLower.js';
import replace from './replace.js';

/**
 * Converts a string, as space-separated words, to lower case.
 *
 * @func
 * @memberOf R
 * @since v0.30.2
 * @category String
 * @sig String -> String
 * @param {String} str The string to convert to lower case with space separation.
 * @return {String} The lower case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.lowerCase('HelloWorld'); //=> 'hello world'
 *      R.lowerCase('hello_world'); //=> 'hello world'
 *      R.lowerCase('HELLO-WORLD'); //=> 'hello world'
 */


var lowerCase =  _curry1(function lowerCase(str) {
  return _isString(str) ?  compose(
    toLower,
    replace(/([a-z])([A-Z])/g, '$1 $2'),
    replace(/[\s_-]+/g, ' '))(str)  : '';
});

export default lowerCase;
