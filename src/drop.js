var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _slice = require('./internal/_slice');
var _xdrop = require('./internal/_xdrop');


/**
 * Returns a new list containing all but the first `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 * @see R.transduce
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The array to consider.
 * @return {Array} The last `n` elements of `list`.
 * @example
 *
 *     R.drop(3, [1,2,3,4,5,6,7]); //=> [4,5,6,7]
 */
module.exports = _curry2(_dispatchable('drop', _xdrop, function drop(n, list) {
  return n < list.length ? _slice(list, n) : [];
}));
