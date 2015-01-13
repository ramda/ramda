var always = require('./always');


/**
 * A function that takes one argument and always returns `true`.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> Boolean
 * @see R.always
 * @return {Boolean} `true`
 * @example
 *
 *      R.T('xxx'); //=> true
 */
module.exports = always(true);
