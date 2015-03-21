var _curry2 = require('./internal/_curry2');
var _satisfiesSpec = require('./internal/_satisfiesSpec');
var groupBy = require('./groupBy');
var keys = require('./keys');


/**
 * Takes a spec object and a test object and returns true if the test satisfies the spec.
 * Any property on the spec that is not a function is interpreted as an equality
 * relation.
 *
 * If the spec has a property mapped to a function, then `where` evaluates the function, passing in
 * the test object's value for the property in question, as well as the whole test object.
 *
 * `where` is well suited to declaratively expressing constraints for other functions, e.g.,
 * `filter`, `find`, `pickBy`, etc.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> {k: v} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @example
 *
 *      var spec = {x: 2};
 *      R.where(spec, {w: 10, x: 2, y: 300}); //=> true
 *      R.where(spec, {x: 1, y: 'moo', z: true}); //=> false
 *
 *      var spec2 = {x: function(val, obj) { return  val + obj.y > 10; }};
 *      R.where(spec2, {x: 2, y: 7}); //=> false
 *      R.where(spec2, {x: 3, y: 8}); //=> true
 *
 *      var xs = [{x: 2, y: 1}, {x: 10, y: 2}, {x: 8, y: 3}, {x: 10, y: 4}];
 *      R.filter(R.where({x: 10}), xs); // ==> [{x: 10, y: 2}, {x: 10, y: 4}]
 */
module.exports = _curry2(function where(spec, testObj) {
  var parsedSpec = groupBy(function(key) {
    return typeof spec[key] === 'function' ? 'fn' : 'obj';
  }, keys(spec));

  return _satisfiesSpec(spec, parsedSpec, testObj);
});
