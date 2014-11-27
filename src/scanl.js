var _curry3 = require('./internal/_curry3');


/**
 * Scanl is similar to foldl, but returns a list of successively reduced values from the left
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a,b -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scanl(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 */
module.exports = _curry3(function scanl(fn, acc, list) {
    var idx = 0, len = list.length + 1, result = new Array(len);
    result[idx] = acc;
    while (++idx < len) {
        acc = fn(acc, list[idx - 1]);
        result[idx] = acc;
    }
    return result;
});
