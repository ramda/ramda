var flip = require('./flip');
var lte = require('./lte');

/**
 * Returns `true` if the second argument is less than or equal to the first;
 * `false` otherwise. This function is meant to be used in a curried fashion.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.map(R.isLte(3), [1, 2, 3, 4]); // [true, true, true, false]
 *      R.ifElse(R.isLte(3), doSomething, doSomethingElse);
 */
module.exports = flip(lte);
