var always = require('./always');


/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig * -> false
 * @return {Boolean} false
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */
module.exports = always(false);
