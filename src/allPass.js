var _all = require('./internal/_all');
var _predicateWrap = require('./internal/_predicateWrap');
var curry = require('./curry');


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
 *      var gt10 = function(x) { return x > 10; };
 *      var even = function(x) { return x % 2 === 0};
 *      var f = R.allPass([gt10, even]);
 *      f(11); //=> false
 *      f(12); //=> true
 */
module.exports = curry(_predicateWrap(_all));
