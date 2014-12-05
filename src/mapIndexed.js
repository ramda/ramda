var _curry2 = require('./internal/_curry2');


/**
 * Like `map`, but but passes additional parameters to the mapping function.
 * `fn` receives three arguments: *(value, index, list)*.
 *
 * Note: `R.mapIndexed` does not skip deleted or unassigned indices (sparse arrays), unlike
 * the native `Array.prototype.map` method. For more details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a,i,[b] -> b) -> [a] -> [b]
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @example
 *
 *      var squareEnds = function(elt, idx, list) {
 *        if (idx === 0 || idx === list.length - 1) {
 *          return elt * elt;
 *        }
 *        return elt;
 *      };
 *
 *      R.mapIndexed(squareEnds, [8, 5, 3, 0, 9]); //=> [64, 5, 3, 0, 81]
 */
module.exports = _curry2(function mapIndexed(fn, list) {
    var idx = -1, len = list.length, result = new Array(len);
    while (++idx < len) {
        result[idx] = fn(list[idx], idx, list);
    }
    return result;
});
