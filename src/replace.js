var _curry3 = require('./internal/_curry3');


/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} A string with all the matches replaced.
 * @example
 *
 *      R.replace(/\d+/g, 'number', '1 2 three'); //=> 'number number three'
 *
 *      var replaceSemicolon = R.replace(';');
 *      var removeSemicolon = replaceSemicolon('');
 *      removeSemicolon('return 42;'); //=> 'return 42'
 */
module.exports = _curry3(function replace(regex, replacement, str) {
    return str.replace(regex, replacement);
});
