var _all = require('./internal/_all');
var _predicateWrap = require('./internal/_predicateWrap');


/**
 * Given a list of predicates, returns a new predicate that will be true exactly when all of them are.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} list An array of predicate functions
 * @param {*} optional Any arguments to pass into the predicates
 * @return {Function} a function that applies its arguments to each of
 *         the predicates, returning `true` if all are satisfied.
 * @example
 *
 *      > var gt10 = function(n) { return n > 10; }
 *      > var even = function(n) { return n % 2 === 0; }
 *      > var pred = R.allPass([gt10, even])
 *      > pred(11)
 *      false
 *      > pred(12)
 *      true
 */
module.exports = _predicateWrap(_all);
