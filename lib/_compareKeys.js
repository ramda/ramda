var comparator = require('./comparator');


/**
 * Compare two items from a list generated from the `_keyValue`
 * function. Used internally by sortBy.
 *
 * @private
 * @func
 * @category relation
 * @param {*} a
 * @param {*} b
 */
module.exports = comparator(function(a, b) {
    return a.key < b.key;
});
