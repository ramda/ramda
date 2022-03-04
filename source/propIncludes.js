import _curry3 from './internal/_curry3.js';
import prop from './prop.js';
import includes from './includes.js';


/**
 * Returns `true` if the specified object property is found in the list supplied,
 * in [`R.includes`](#includes) terms; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig String -> [a] -> Object -> Boolean
 * @param {String} name
 * @param {Array} list
 * @param {*} obj
 * @return {Boolean}
 * @see R.propEq, R.propSatisfies, R.includes
 * @example
 *
 *      const kwabena = {name: 'Kwabena', country: "ghana"};
 *      const naadei = {name: 'Naadei', country: "ghana"};
 *      const bogdan = {name: 'Bogdan', country: "romania"};
 *      const contributors = [kwabena, naadei, bogdan]
 *
 *      const africanCountries = ["ghana", "nigeria"];
 *      const isFromAfrica = R.includes('country', africanCountries);
 *      R.filter(isFromAfrica, contributors); //=> [kwabena, naadei]
 */
var propIncludes = _curry3(function propIncludes(name, list, obj) {
  return includes(prop(name, obj), list);
});
export default propIncludes;
