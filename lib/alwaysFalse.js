var always = require('./always');


/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @category function
 * @sig * -> false
 * @see R.always
 * @return {Boolean} false
 * @example
 *
 *      R.alwaysFalse(); //=> false
 */
module.exports = always(false);
