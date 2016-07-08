var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');

/**
 * Returns a function that, when supplied a path, returns the indicated
 * property of that object, if it exists.  If the property does not
 * exist at the supplied path, undefined is returned.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [String] -> Object -> * | Undefined
 * @param {Array} path the path to get
 * @param {Object} obj the object to query
 * @return {*} The value at the specifed path in `obj`.
 * @see R.path
 * @example
 *
 *      R.propPath(['x', 'y', 'z'], {x: { y: { z: 100 } } }); //=> 100
 *      R.propPath(['x', 'y', 'z'], {}); //=> undefined
 */
module.exports = _curry2(function propPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return obj[path[0]];
    default:
      return propPath(_slice(path, 1), Object(obj[path[0]]));
  }
});
