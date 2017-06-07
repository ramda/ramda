var flip = require('./flip');
var lt = require('./lt');

/**
 * Returns `true` if the second argument is less than the first; `false`
 * otherwise. This function is meant to be used in a curried fashion.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.map(R.isLt(3), [1, 2, 3, 4]); // [true, true, false, false]
 *      R.ifElse(R.isLt(3), doSomething, doSomethingElse);
 */
module.exports = flip(lt);
