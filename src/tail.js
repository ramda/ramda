var _checkForMethod = require('./internal/_checkForMethod');
var _slice = require('./internal/_slice');


/**
 * Returns all but the first element of a list. If the list provided has the `tail` method,
 * it will instead return `list.tail()`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} [list=[]] The array to consider.
 * @return {Array} A new array containing all but the first element of the input list, or an
 *         empty list if the input list is empty.
 * @example
 *
 *      R.tail(['fi', 'fo', 'fum']); //=> ['fo', 'fum']
 */
module.exports = _checkForMethod('tail', function(list) {
    return _slice(list, 1);
});
