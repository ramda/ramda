var _curry1 = require('./internal/_curry1');
var _reduced = require('./internal/_reduced');

/**
 * Returns a value wrapped to indicate that it is the final value of the
 * reduce and transduce functions.  The returned value
 * should be considered a black box: the internal structure is not
 * guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above.  For instance, it is not currently supported by reduceIndexed,
 * reduceRight, or reduceRightIndexed.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @see R.reduce, R.transduce
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @example
 *
 *      R.reduce(
 *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
 *        0,
 *        [1, 2, 3, 4, 5]) // 10
 */

module.exports = _curry1(_reduced);
