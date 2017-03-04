var _curry2 = require('./internal/_curry2');

/**
 * Takes a list of getter functions and an object.
 *
 * Returns the value of the first getter to return a non-nil value.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig [(a -> *)] -> a -> * | Undefined
 * @param {Array} fns The list of getter functions.
 * @param {Object} The object to query.
 * @return {*} The value of the first non-nil getter, null otherwise.
  * @example
 *
 *      var getNewHeader = R.path(['config', 'properties', 'header']);
 *      var getLegacyHeader = R.path(['properties', 'header']);
 *      var legacy = {properties: {header: 'foo'}};
 *      var new = {config: {properties: {header: 'bar'}}};
 *      var invalid = {header: 'oops'};
 *      var getHeader = R.through([getNewHeader, getLegacyHeader]);
 *      R.map(getHeader, [legacy, new, invalid]) // ['foo', 'bar', undefined]
 */
module.exports = _curry2(function(fns, value) {
  if (fns.length === 0) { return undefined; }
  var idx = 0;
  while (idx < fns.length) {
    var r = fns[idx](value);
    if (typeof r !== 'undefined') { return r; }
    idx += 1;
  }
  return undefined;
});
