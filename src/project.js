var _map = require('./internal/_map');
var identity = require('./identity');
var pickAll = require('./pickAll');
var useWith = require('./useWith');


/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      > var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2}
 *      > var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7}
 *      > R.project(['name', 'grade'], [abby, fred])
 *      [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */
module.exports = useWith(_map, pickAll, identity); // passing `identity` gives correct arity
