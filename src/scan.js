var _curry3 = require('./internal/_curry3');


/**
 * Scan is similar to reduce, but returns a list of successively reduced values from the left
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
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 */
module.exports = _curry3(function scan(fn, acc, list) {
    var result = [acc];
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        acc = fn(acc, list[idx]);
        result.push(acc);
    }
    return result;
});
