import _curry2 from './internal/_curry2.js';


/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      const matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
var objOf = _curry2(function objOf(key, val) {
  var obj = {};
  if (key === '__proto__') {
    Object.defineProperty(obj, key, {
      value: val,
      writable: true,
      enumerable: true,
      configurable: true
    });
  } else {
    obj[key] = val;
  }
  return obj;
});
export default objOf;
