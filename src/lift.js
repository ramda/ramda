var _curry1 = require('./internal/_curry1');
var liftN = require('./liftN');


/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([100, 200], [30, 40, 50], [6, 7]); //=> [136, 137, 146, 147, 156, 157, 236, 237, 246, 247, 256, 257]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([10000, 20000], [3000], [400, 500], [60], [7, 8]); //=> [13467, 13468, 13567, 13568, 23467, 23468, 23567, 23568]
 */
module.exports = _curry1(function lift(fn) {
  return liftN(fn.length, fn);
});
