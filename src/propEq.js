var _curry3 = require('./internal/_curry3');


/**
 * Determines whether the given property of an object has a specific
 * value according to strict equality (`===`).  Most likely used to
 * filter a list:
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig k -> v -> {k: v} -> Boolean
 * @param {Number|String} name The property name (or index) to use.
 * @param {*} val The value to compare the property with.
 * @return {Boolean} `true` if the properties are equal, `false` otherwise.
 * @example
 *
 *      > var abby = {name: 'Abby', age: 7, hair: 'blond'}
 *      > var fred = {name: 'Fred', age: 12, hair: 'brown'}
 *      > var rusty = {name: 'Rusty', age: 10, hair: 'brown'}
 *      > var alois = {name: 'Alois', age: 15, disposition: 'surly'}
 *      > R.filter(R.propEq('hair', 'brown'), [abby, fred, rusty, alois])
 *      [fred, rusty]
 */
module.exports = _curry3(function propEq(name, val, obj) {
    return obj[name] === val;
});
