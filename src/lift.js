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
 *      // computes Cartesian product for Arrays
 *      madd3([100, 200], [30, 40, 50], [6, 7]); //=> [136, 137, 146, 147, 156, 157, 236, 237, 246, 247, 256, 257]
 *
 *      // works with object that satisfies the FantasyLand Apply spec, such as Maybe in Sanctuary
 *      madd3(S.Just(1), S.Just(2), S.Just(3)); //=> Just(6)
 */
module.exports = _curry1(function lift(fn) {
  return liftN(fn.length, fn);
});
