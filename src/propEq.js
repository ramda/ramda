var _curry3 = require('./internal/_curry3');
var equals = require('./equals');
var propSatisfies = require('./propSatisfies');


/**
 * Returns `true` if the specified object property is equal, in `R.equals`
 * terms, to the given value; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig a -> String -> Object -> Boolean
 * @param {*} val
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.equals
 * @see R.propSatisfies
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('brown', 'hair');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */
module.exports = _curry3(function propEq(val, name, obj) {
  return propSatisfies(equals(val), name, obj);
});
