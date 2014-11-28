var _append = require('./_append');
var _concat = require('./_concat');
var _curry3 = require('./_curry3');
var _slice = require('./_slice');


/**
 * Inserts the supplied element into the list, at index `index`.  _Note
 * that this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */
module.exports = _curry3(function insert(idx, elt, list) {
    idx = idx < list.length && idx >= 0 ? idx : list.length;
    return _concat(_append(elt, _slice(list, 0, idx)), _slice(list, idx));
});
