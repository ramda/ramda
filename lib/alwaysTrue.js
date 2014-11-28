var always = require('./always');


/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @category function
 * @sig * -> true
 * @see R.always
 * @return {Boolean} `true`.
 * @example
 *
 *      R.alwaysTrue(); //=> true
 */
module.exports = always(true);
