var _curry2 = require('./internal/_curry2');
var _prepend = require('./internal/_prepend');


/**
 * Returns a new list with the given element at the front, followed by the contents of the
 * list.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */
module.exports = _curry2(_prepend);
