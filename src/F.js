var always = require('./always');


/**
 * A function that takes one argument and always returns `false`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> Boolean
 * @see R.always
 * @return {Boolean} false
 * @example
 *
 *      R.F('xxx'); //=> false
 */
module.exports = always(false);
