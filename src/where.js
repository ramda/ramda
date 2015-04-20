var _curry2 = require('./internal/_curry2');
var _has = require('./internal/_has');
var eqProps = require('./eqProps');


/**
 * Takes a spec object and a test object and returns true if the test satisfies the spec.
 *
 * `where` is well suited to declaratively expressing constraints for other functions, e.g.,
 * `filter`, `find`, `pickBy`, etc.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig Object -> Object -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @example
 *
 *      var spec = {x: 2};
 *      R.where(spec, {w: 10, x: 2, y: 300}); //=> true
 *      R.where(spec, {x: 1, y: 'moo', z: true}); //=> false
 *
 *      var xs = [{x: 2, y: 1}, {x: 10, y: 2}, {x: 8, y: 3}, {x: 10, y: 4}];
 *      R.filter(R.where({x: 10}), xs); //=> [{x: 10, y: 2}, {x: 10, y: 4}]
 */
module.exports = _curry2(function where(spec, testObj) {
  testObj = Object(testObj);
  for (var prop in spec) {
    if (_has(prop, spec) && !eqProps(prop, spec, testObj)) {
      return false;
    }
  }
  return true;
});
