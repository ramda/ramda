var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _slice = require('./internal/_slice');
var _xdrop = require('./internal/_xdrop');


/**
 * Returns a list containing all but the first `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 * @see R.transduce
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements of `xs` to skip.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */
module.exports = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
  return _slice(xs, Math.max(0, n));
}));
