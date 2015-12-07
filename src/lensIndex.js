var _curry1 = require('./internal/_curry1');
var lens = require('./lens');


/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */
module.exports = _curry1(function lensIndex(n) {
  return lens(
    function(_xs) {
      var xs = _xs == null ? [] : _xs;
      return xs[n];
    },
    function(x, _xs) {
      var xs = _xs == null ? [] : _xs;
      var result = [];
      var max = Math.max(n, xs.length - 1);
      var idx = 0;
      while (idx <= max) {
        result.push(xs[idx]);
        idx += 1;
      }
      result[n] = x;
      return result;
    }
  );
});
