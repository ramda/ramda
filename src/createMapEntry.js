var objOf = require('./objOf');


/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair, R.objOf
 * @deprecated since v0.18.0
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.createMapEntry('must'),
 *        R.map(R.createMapEntry('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */
module.exports = objOf;
