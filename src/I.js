var identity = require('./identity');


/**
 * An alias for R.identity (a function that does nothing but
 * return the parameter supplied to it). Good as a default or
 * placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.I(1); //=> 1
 *
 *      var obj = {};
 *      R.I(obj) === obj; //=> true
 * @symb R.I(a) = a
 */
module.exports = identity;
