var equals = require('./equals');


/**
 * Performs a deep test on whether two items are equal.
 * Equality implies the two items are semmatically equivalent.
 * Cyclic structures are handled as expected
 * @see R.equals
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @deprecated since v0.15.0
 * @example
 *
 *      var o = {};
 *      R.eqDeep(o, o); //=> true
 *      R.eqDeep(o, {}); //=> true
 *      R.eqDeep(1, 1); //=> true
 *      R.eqDeep(1, '1'); //=> false
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.eqDeep(a, b); //=> true
 */

module.exports = equals;
