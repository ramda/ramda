var _curry2 = require('./internal/_curry2');
var _extend = require('./internal/_extend');


/**
 * Create a new object with the own properties of a
 * merged with the own properties of object b.
 * This function will *not* mutate passed-in objects.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} a source object
 * @param {Object} b object with higher precedence in output
 * @return {Object} The destination object.
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 */
module.exports = _curry2(function merge(a, b) {
  return _extend(_extend({}, a), b);
});
