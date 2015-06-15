var _curry1 = require('./internal/_curry1');
var lens = require('./lens');
var nth = require('./nth');
var update = require('./update');


/**
 * Creates a lens that will focus on index `n` of the source array.
 *
 * @func
 * @memberOf R
 * @category List
 * @see R.lens
 * @sig Number -> (a -> b)
 * @param {Number} n The index of the array that the returned lens will focus on.
 * @return {Function} the returned function has `set` and `map` properties that are
 *         also curried functions.
 * @example
 *
 *     var headLens = R.lensIndex(0);
 *     headLens([10, 20, 30, 40]); //=> 10
 *     headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
 *     headLens.map(function(x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
 */
module.exports = _curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});
