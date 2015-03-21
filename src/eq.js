var _curry2 = require('./internal/_curry2');


/**
 * Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
 * non-coercing equality for primitives.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig a -> b -> Boolean
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
module.exports = _curry2(function eq(a, b) {
  if (a === 0) {
    return 1 / a === 1 / b;
  } else {
    return a === b || (a !== a && b !== b);
  }
});
