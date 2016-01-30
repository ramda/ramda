var _curry2 = require('./internal/_curry2');
var _has = require('./internal/_has');


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be either a predicate
 * function, or a spec for that property's value to be evaluated recursively.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as `filter` and `find`.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(_, 10),
 *        y: R.lt(_, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 *
 *      // Recursive behavior
 *      var pred = R.where({
 *        a: {
 *          x: R.equals('foo')
 *        },
 *        b: R.complement(R.equals('bar'))
 *      });
 *
 *      pred({a: {b: 'foo'}, b: 'xxx'}); //=> true
 *      pred({a: {b: 'xxx'}, b: 'xxx'}); //=> false
 *      pred({a: {b: 'foo'}, b: 'bar'}); //=> false
 */
module.exports = _curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec)) {
      var type = typeof spec[prop];
      if ((type == 'function' && !spec[prop](testObj[prop])) ||
          (type == 'object' && !where(spec[prop], testObj[prop]))) {
        return false;
      }
    }
  }
  return true;
});
