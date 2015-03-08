/**
 * An optimized, private array `slice` implementation.
 *
 * @private
 * @param {Arguments|Array} args The array or arguments object to consider.
 * @param {Number} [from=0] The array index to slice from, inclusive.
 * @param {Number} [to=args.length] The array index to slice to, exclusive.
 * @return {Array} A new, sliced array.
 * @example
 *
 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
 *
 *      var firstThreeArgs = function(a, b, c, d) {
 *        return _slice(arguments, 0, 3);
 *      };
 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
 */
module.exports = function _slice(args, from, to) {
    switch (arguments.length) {
        case 1: return _slice(args, 0, args.length);
        case 2: return _slice(args, from, args.length);
        default:
            var result = [];
            for (var idx = 0, len = Math.max(0, to - from); idx < len; idx += 1) {
                result.push(args[from + idx]);
            }
            return result;
    }
};
