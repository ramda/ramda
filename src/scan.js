var _curry3 = require('./internal/_curry3');
var _scan = require('./internal/_scan');
/**
 * Scan is similar to reduce, but returns a list of successively reduced values
 * from the left
 *
 * Dispatches to the `scan` method of the third argument, if present.
 * @func
 * @memberOf R
 * @since v0.10.0
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
module.exports = _curry3(_scan);
