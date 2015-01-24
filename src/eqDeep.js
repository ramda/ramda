var _curry2 = require('./internal/_curry2');
var _eqDeep = require('./internal/_eqDeep');

/**
 * Performs a deep test on whether two items are equal.
 * Equality implies the two items are semmatically equivalent.
 * Cyclic structures are handled as expected
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
 *      R.eqDeep(o, o); //=> true
 *      R.eqDeep(o, {}); //=> true
 *      R.eqDeep(1, 1); //=> true
 *      R.eqDeep(1, '1'); //=> false
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.eqDeep(a, b); //=> true
 */

module.exports = _curry2(function eqDeep(a, b) {
    return _eqDeep(a, b, [], []);
});
