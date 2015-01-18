var _append = require('./internal/_append');
var _curry2 = require('./internal/_curry2');


/**
 * Returns a new list containing the contents of the given list, followed by the given
 * element.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list whose contents will be added to the beginning of the output
 *        list.
 * @return {Array} A new list containing the contents of the old list followed by `el`.
 * @example
 *
 *      > R.append('tests', ['write', 'more'])
 *      ['write', 'more', 'tests']
 *      > R.append('tests', [])
 *      ['tests']
 *      > R.append(['tests'], ['write', 'more'])
 *      ['write', 'more', ['tests']]
 */
module.exports = _curry2(_append);
