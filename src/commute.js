var commuteMap = require('./commuteMap');
var identity = require('./identity');


/**
 * Turns a list of Functors into a Functor of a list.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category List
 * @see R.commuteMap
 * @sig Functor f => (x -> f x) -> [f a] -> f [a]
 * @param {Function} of A function that returns the data type to return
 * @param {Array} list An array of functors of the same type
 * @return {*}
 * @example
 *
 *      R.commute(R.of, [[1], [2, 3]]);   //=> [[1, 2], [1, 3]]
 *      R.commute(R.of, [[1, 2], [3]]);   //=> [[1, 3], [2, 3]]
 *      R.commute(R.of, [[1], [2], [3]]); //=> [[1, 2, 3]]
 *      R.commute(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.commute(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 */
module.exports = commuteMap(identity);
