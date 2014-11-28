var _concat = require('./_concat');
var _curry3 = require('./_curry3');
var _slice = require('./_slice');


/**
 * Inserts the sub-list into the list, at index `index`.  _Note  that this
 * is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insert.all(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */
module.exports = _curry3(function insertAll(idx, elts, list) {
    idx = idx < list.length && idx >= 0 ? idx : list.length;
    return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
});
