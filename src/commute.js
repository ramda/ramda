var commuteMap = require('./commuteMap');
var identity = require('./identity');
var map = require('./map');


/**
 * Turns a list of Functors into a Functor of a list.
 *
 * Note: `commute` may be more useful to convert a list of non-Array Functors (e.g.
 * Maybe, Either, etc.) to Functor of a list.
 *
 * @func
 * @memberOf R
 * @category List
 * @see R.commuteMap
 * @sig (x -> [x]) -> [[*]...]
 * @param {Function} of A function that returns the data type to return
 * @param {Array} list An Array (or other Functor) of Arrays (or other Functors)
 * @return {Array}
 * @example
 *
 *     var as = [[1], [3, 4]];
 *     R.commute(R.of, as); //=> [[1, 3], [1, 4]]
 *
 *     var bs = [[1, 2], [3]];
 *     R.commute(R.of, bs); //=> [[1, 3], [2, 3]]
 *
 *     var cs = [[1, 2], [3, 4]];
 *     R.commute(R.of, cs); //=> [[1, 3], [2, 3], [1, 4], [2, 4]]
 */
module.exports = commuteMap(map(identity));
