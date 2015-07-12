var _complement = require('./internal/_complement');
var _curry1 = require('./internal/_curry1');


/**
 * Takes a function `f` and returns a function `g` such that:
 *
 *   - applying `g` to zero or more arguments will give __true__ if applying
 *     the same arguments to `f` gives a logical __false__ value; and
 *
 *   - applying `g` to zero or more arguments will give __false__ if applying
 *     the same arguments to `f` gives a logical __true__ value.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isEven = function(n) { return n % 2 === 0; };
 *      var isOdd = R.complement(isEven);
 *      isOdd(21); //=> true
 *      isOdd(42); //=> false
 */
module.exports = _curry1(_complement);
