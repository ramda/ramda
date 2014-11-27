/**
 * Returns a new list by plucking the same named property off all objects in the list supplied.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig String -> {*} -> [*]
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} list The array to consider.
 * @return {Array} The list of values for the given key.
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 */
var pluck = R.pluck = _curry2(function pluck(p, list) {
    return _map(prop(p), list);
});
