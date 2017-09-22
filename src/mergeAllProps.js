var _curry2 = require('./internal/_curry2');
var mergeAll = require('./mergeAll');
var props = require('./props');

/**
 * Function that does the same as object spread
 *
 * @func
 * @memberOf R
 * @since vN
 * @category Object
 * @sig [k] -> {k: {a}} -> {a}
 * @param {Array} ps The property names to fetch
 * @param {Array} obj The object to query
 * @return {Object} A merged properties of object.
 * @see R.mergeAll, R.props
 * @example
 *
 *      const obj = {
 *        foo: { fooinner: 1 },
 *        bar: { barinner: 2 }
 *      };
 *      // this statements are equal
 *      const expected   = { fooinner: 1, barinner: 2 };
 *      const withSpread = { ...obj.foo, ...obj.bar }
 *      const withFunc   = R.mergeAllProps(['foo', 'bar'], obj)
 * @symb R.mergeAllProps([p1, p2], { p1: { a1: 1 }, p2: { a2: 2 } }) = { a1: 1, a2, 2 }
 */
module.exports = _curry2(function mergeAllProps(ps, object) {
  return mergeAll(props(ps, object));
});
