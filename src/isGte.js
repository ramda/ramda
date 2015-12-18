var flip = require('./flip');
var gte = require('./gte');

/**
 * Returns `true` if the second argument is greater than or equal to the first;
 * `false` otherwise. This function is meant to be used in a curried fashion.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.map(R.isGte(3), [1, 2, 3, 4]); // [false, false, true, true]
 *      R.ifElse(R.isGte(3), doSomething, doSomethingElse);
 */
module.exports = flip(gte);
