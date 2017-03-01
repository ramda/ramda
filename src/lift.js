var map = require('./map');


/**
 * Alias of [`map`](#map).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function}
 * @param {*}
 * @return {*}
 * @see R.lift2, R.lift3
 * @example
 *
 *      R.lift(R.inc, Just(2)); //=> Just(3)
 *      R.lift(R.inc, Nothing); //=> Nothing
 */
module.exports = map;
