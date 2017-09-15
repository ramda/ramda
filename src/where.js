var _curry2 = require('./internal/_curry2');
var _has = require('./internal/_has');


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each predicate can be applied recursively to the value of the
 * corresponding property of the test object. `where` returns true if all the
 * predicates return true, false otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 *
 *      // predicate recursively
 *      var predRcrsv = R.where({
 *        a: {
 *          b: R.equals('bar'),
 *        },
 *        x: R.gt(R.__, 10),
 *      });
 *      predRcrsv({a: { b: 'bar' }, x: 11, y: 19}); //=> true
 *      predRcrsv({a: { b: 'bar' }, x: 10, y: 19}); //=> false
 *      predRcrsv({a: { b: 'xxx' }, x: 11, y: 19}); //=> false
 *      predRcrsv({a: { c: 'bar' }, x: 11, y: 19}); //=> false
 *      predRcrsv({b: 'bar', x: 11, y: 19});        //=> false
 */
module.exports = _curry2(function where(specs, object) {
  var result = true;
  var spec, obj, type, inResult;
  for (var key in specs) {
    spec = specs[key];
    obj  = object[key];
    type = typeof spec;
    inResult = !_has(key, specs)        ? true
             : type === 'function'      ? spec(obj)
             : obj && type === 'object' ? where(spec, obj)
                                        : false;
    result = result && inResult;
  }
  return result;
});
