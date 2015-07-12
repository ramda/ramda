var _curry2 = require('./internal/_curry2');
var keys = require('./keys');


/**
 * Create a new object with the own properties of `a`
 * merged with the own properties of object `b`.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 */
module.exports = _curry2(function merge(a, b) {
  var result = {};
  var ks = keys(a);
  var idx = 0;
  while (idx < ks.length) {
    result[ks[idx]] = a[ks[idx]];
    idx += 1;
  }
  ks = keys(b);
  idx = 0;
  while (idx < ks.length) {
    result[ks[idx]] = b[ks[idx]];
    idx += 1;
  }
  return result;
});
