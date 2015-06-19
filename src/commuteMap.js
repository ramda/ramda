var _curry3 = require('./internal/_curry3');
var _reduce = require('./internal/_reduce');
var ap = require('./ap');
var append = require('./append');
var map = require('./map');


/**
 * Turns a list of Functors into a Functor of a list, applying
 * a mapping function to the elements of the list along the way.
 *
 * @func
 * @memberOf R
 * @category List
 * @see R.commute
 * @sig Functor f => (f a -> f b) -> (x -> f x) -> [f a] -> f [b]
 * @param {Function} fn The transformation function
 * @param {Function} of A function that returns the data type to return
 * @param {Array} list An array of functors of the same type
 * @return {*}
 * @example
 *
 *      R.commuteMap(R.map(R.add(10)), R.of, [[1], [2, 3]]);   //=> [[11, 12], [11, 13]]
 *      R.commuteMap(R.map(R.add(10)), R.of, [[1, 2], [3]]);   //=> [[11, 13], [12, 13]]
 *      R.commuteMap(R.map(R.add(10)), R.of, [[1], [2], [3]]); //=> [[11, 12, 13]]
 *      R.commuteMap(R.map(R.add(10)), Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([11, 12, 13])
 *      R.commuteMap(R.map(R.add(10)), Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 */
module.exports = _curry3(function commuteMap(fn, of, list) {
  function consF(acc, ftor) {
    return ap(map(append, fn(ftor)), acc);
  }
  return _reduce(consF, of([]), list);
});
