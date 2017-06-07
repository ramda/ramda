var flip = require('./flip');
var gt = require('./gt');

/**
 * Returns `true` if the second argument is greater than the first; `false`
 * otherwise. This function is meant to be used in a curried fashion.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.map(R.isGt(3), [1, 2, 3, 4]); // [false, false, false, true]
 *      R.ifElse(R.isGt(3), doSomething, doSomethingElse);
 */
module.exports = flip(gt);
