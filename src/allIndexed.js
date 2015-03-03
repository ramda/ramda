var _curry2 = require('./internal/_curry2');

/**
 * Like `all`, but but passes additional parameters to the predicate function.
 *
 * `fn` receives three arguments: *(value, index, list)*.
 * Returns `true` if all elements of the list match the predicate, `false` if there are any
 * that don't.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a, i, [a] -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @example
 *
 *      var firstIndexOf5ThatIsNotFollowingA4;
 *
 *      R.allIndexed(function(num, idx, list) {
 *        if( num === 5 && list[idx-1] != 4 ) {
 *          firstIndexOf5ThatIsNotFollowingA4 = idx;
 *          return false; // use short circuit to stop here.
 *        } else {
 *          return true;
 *        }
 *      },[4, 5, 1, 2, 5, 6, 5]);
 */
module.exports = _curry2(function _all(fn, list) {
    var idx = -1;
    while (++idx < list.length) {
        if (!fn(list[idx], idx, list)) {
            return false;
        }
    }
    return true;
});

