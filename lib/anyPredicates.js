var _predicateWrap = require('./_predicateWrap');
var _some = require('./_some');


/**
 * Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
 *
 * @func
 * @memberOf R
 * @category logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} list An array of predicate functions
 * @param {*} optional Any arguments to pass into the predicates
 * @return {Function} A function that applies its arguments to each of the predicates, returning
 *         `true` if all are satisfied.
 * @example
 *
 *      var gt10 = function(x) { return x > 10; };
 *      var even = function(x) { return x % 2 === 0};
 *      var f = R.anyPredicates([gt10, even]);
 *      f(11); //=> true
 *      f(8); //=> true
 *      f(9); //=> false
 */
module.exports = _predicateWrap(_some);
