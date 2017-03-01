var ap = require('./ap');
var curryN = require('./curryN');
var map = require('./map');


/**
 * Promotes a curried ternary function to a function which operates on three
 * [Apply](https://github.com/fantasyland/fantasy-land#apply)s.
 *
 * This function is derived from `map` and `ap`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
 * @param {Function}
 * @param {*}
 * @param {*}
 * @param {*}
 * @return {*}
 * @see R.lift, R.lift2
 * @example
 *
 *      R.lift3(x => y => z => x + z + y, ['<'], ['>'], ['foo', 'bar', 'baz']); //=> ['<foo>', '<bar>', '<baz>']
 *      R.lift3(x => y => z => x + z + y, Just('<'), Just('>'), Just('baz')); //=> Just('<baz>')
 */
module.exports = curryN(4, function lift3(f, x, y, z) {
  return ap(ap(map(f, x), y), z);
});
