var _any = require('./internal/_any');
var _predicateWrap = require('./internal/_predicateWrap');


/**
 * Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} list An array of predicate functions
 * @param {*} optional Any arguments to pass into the predicates
 * @return {Function} A function that applies its arguments to each of the predicates, returning
 *         `true` if all are satisfied.
 * @example
 *
 *      > var gt10 = function(n) { return n > 10; }
 *      > var even = function(n) { return n % 2 === 0; }
 *      > var pred = R.anyPass([gt10, even])
 *      > pred(11)
 *      true
 *      > pred(8)
 *      true
 *      > pred(9)
 *      false
 */
module.exports = _predicateWrap(_any);
