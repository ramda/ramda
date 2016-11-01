var _curry3 = require('./internal/_curry3');
var ap = require('./ap');
var map = require('./map');


/**
 * Promotes a curried binary function to a function which operates on two
 * [Apply](https://github.com/fantasyland/fantasy-land#apply)s.
 *
 * This function is derived from `map` and `ap`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Apply f => (a -> b -> c) -> f a -> f b -> f c
 * @param {Function}
 * @param {*}
 * @param {*}
 * @return {*}
 * @see R.lift, R.lift3
 * @example
 *
 *      R.lift2(x => y => Math.pow(x, y), [10], [1, 2, 3]); //=> [10, 100, 1000]
 *      R.lift2(x => y => Math.pow(x, y), Just(10), Just(3)); //=> Just(1000)
 */
module.exports = _curry3(function lift2(f, x, y) {
  return ap(map(f, x), y);
});
