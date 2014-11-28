var flip = require('./flip');
var prop = require('./prop');


/**
 * Returns the value at the specified property.
 * The only difference from `prop` is the parameter order.
 *
 * @func
 * @memberOf R
 * @see R.prop
 * @category Object
 * @sig {k: v} -> k -> v
 * @param {Object} obj The object to query
 * @param {String} p The property name
 * @return {*} The value at `obj.p`.
 * @example
 *
 *      R.propOf({x: 100}, 'x'); //=> 100
 */
module.exports = flip(prop);
