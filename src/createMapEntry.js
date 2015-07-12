var _curry2 = require('./internal/_curry2');


/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.createMapEntry('must'),
 *        R.map(R.createMapEntry('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
module.exports = _curry2(function createMapEntry(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
