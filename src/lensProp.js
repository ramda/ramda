var assoc = require('./assoc');
var lens = require('./lens');
var prop = require('./prop');

/**
 * Creates a lens that will focus on property `k` of the source object.
 *
 * @func
 * @memberOf R
 * @category Object
 * @see R.lens
 * @sig String -> (a -> b)
 * @param {String} k A string that represents a property to focus on.
 * @return {Function} the returned function has `set` and `map` properties that are
 *         also curried functions.
 * @example
 *
 *     var phraseLens = R.lensProp('phrase');
 *     var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!'};
 *     var obj2 = { phrase: "What's all this, then?"};
 *     phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
 *     phraseLens(obj2); // => "What's all this, then?"
 *     phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
 *     phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
 */
module.exports = function(k) {
  return lens(prop(k), assoc(k));
};

