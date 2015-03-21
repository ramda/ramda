var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _slice = require('./internal/_slice');
var _xtake = require('./internal/_xtake');


/**
 * Returns a new list containing the first `n` elements of the given list.  If
 * `n > * list.length`, returns a list of `list.length` elements.
 *
 * Acts as a transducer if a transformer is given in list position.
 * @see R.transduce
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements to return.
 * @param {Array} list The array to query.
 * @return {Array} A new array containing the first elements of `list`.
 * @example
 *
 *      R.take(3,[1,2,3,4,5]); //=> [1,2,3]
 *
 *      var members= [ "Paul Desmond","Bob Bates","Joe Dodge","Ron Crotty","Lloyd Davis","Joe Morello","Norman Bates",
 *                     "Eugene Wright","Gerry Mulligan","Jack Six","Alan Dawson","Darius Brubeck","Chris Brubeck",
 *                     "Dan Brubeck","Bobby Militello","Michael Moore","Randy Jones"];
 *      var takeFive = R.take(5);
 *      takeFive(members); //=> ["Paul Desmond","Bob Bates","Joe Dodge","Ron Crotty","Lloyd Davis"]
 */
module.exports = _curry2(_dispatchable('take', _xtake, function take(n, list) {
  return _slice(list, 0, Math.min(n, list.length));
}));
