var _concat = require('./_concat');
var _curry3 = require('./_curry3');
var _slice = require('./_slice');


/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements.  _Note that this is not destructive_: it returns a
 * copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */
module.exports = _curry3(function remove(start, count, list) {
    return _concat(_slice(list, 0, Math.min(start, list.length)),
                   _slice(list, Math.min(list.length, start + count)));
});
