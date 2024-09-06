import _curry1 from './internal/_curry1.js';
import _isString from './internal/_isString.js';
import compose from './compose.js';
import toUpper from './toUpper.js';
import replace from './replace.js';

/**
 * Converts a string, as space-separated words, to upper case.
 *
 * @func
 * @memberOf R
 * @since v0.30.2
 * @category String
 * @sig String -> String
 * @param {String} str The string to convert to upper case with space separation.
 * @return {String} The upper case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.upperCase('HelloWorld'); //=> 'HELLO WORLD'
 *      R.upperCase('hello_world'); //=> 'HELLO WORLD'
 *      R.upperCase('HELLO-WORLD'); //=> 'HELLO WORLD'
 */


var upperCase =  _curry1(function upperCase(str) {
  return _isString(str) ?  compose(
    toUpper,
    replace(/([a-z])([A-Z])/g, '$1 $2'),
    replace(/[\s_-]+/g, ' '))(str)  : '';
});

export default upperCase;
