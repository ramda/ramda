var always = require('./always');


/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig * -> true
 * @see R.always
 * @return {Boolean} `true`.
 * @example
 *
 *      R.T(); //=> true
 */
module.exports = always(true);
