var always = require('./always');


/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig * -> false
 * @see R.always
 * @return {Boolean} false
 * @example
 *
 *      R.F(); //=> false
 */
module.exports = always(false);
