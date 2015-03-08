var _curry2 = require('./internal/_curry2');


/**
 * Returns a list of numbers from `from` (inclusive) to `to`
 * (exclusive).
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */
module.exports = _curry2(function range(from, to) {
    if (from >= to) {
        return [];
    }
    var result = [];
    for (var idx = 0; from < to; idx += 1, from += 1) {
        result.push(from);
    }
    return result;
});
