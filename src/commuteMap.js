var _curry3 = require('./internal/_curry3');
var ap = require('./ap');
var map = require('./map');
var prepend = require('./prepend');
var reduceRight = require('./reduceRight');


/**
 * Turns a list of Functors into a Functor of a list, applying
 * a mapping function to the elements of the list along the way.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category List
 * @see R.commute
 * @sig Functor f => (a -> f b) -> (x -> f x) -> [a] -> f [b]
 * @param {Function} fn The transformation function
 * @param {Function} of A function that returns the data type to return
 * @param {Array} list An array of functors of the same type
 * @return {*}
 * @example
 *
 *      var add10 = R.map(R.add(10));
 *      R.commuteMap(add10, R.of, [[1], [2, 3]]);   //=> [[11, 12], [11, 13]]
 *      R.commuteMap(add10, R.of, [[1, 2], [3]]);   //=> [[11, 13], [12, 13]]
 *      R.commuteMap(add10, R.of, [[1], [2], [3]]); //=> [[11, 12, 13]]
 *      R.commuteMap(add10, Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([11, 12, 13])
 *      R.commuteMap(add10, Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      var fetch = url => Future((rej, res) => http.get(url, res).on('error', rej));
 *      R.commuteMap(fetch, Future.of, [
 *        'http://ramdajs.com',
 *        'http://github.com/ramda'
 *      ]); //=> Future([IncomingMessage, IncomingMessage])
 */
module.exports = _curry3(function commuteMap(fn, of, list) {
  function consF(acc, x) {
    return ap(map(prepend, fn(x)), acc);
  }
  return reduceRight(consF, of([]), list);
});
