var _curry2 = require('./internal/_curry2');
var _eq = require('./internal/_eq');


/**
 * Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
 * non-coercing equality for primitives.
 *
 * Has `Object.is` semantics: `NaN` is considered equal to `NaN`; `0` and `-0`
 * are not considered equal.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.eq(o, o); //=> true
 *      R.eq(o, {}); //=> false
 *      R.eq(1, 1); //=> true
 *      R.eq(1, '1'); //=> false
 *      R.eq(0, -0); //=> false
 *      R.eq(NaN, NaN); //=> true
 */
module.exports = _curry2(_eq);
