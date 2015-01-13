var _map = require('./_map');


/**
 * Creates a new list whose elements each have two properties: `val` is
 * the value of the corresponding item in the list supplied, and `key`
 * is the result of applying the supplied function to that item.
 *
 * @private
 * @func
 * @memberOf R
 * @category Relation
 * @param {Function} fn An arbitrary unary function returning a potential
 *        object key.  Signature: Any -> String
 * @param {Array} list The list of items to process
 * @return {Array} A new list with the described structure.
 * @example
 *
 *      > var people = [
 *      .     {first: 'Fred', last: 'Flintstone', age: 23},
 *      .     {first: 'Betty', last: 'Rubble', age: 21},
 *      .     {first: 'George', last: 'Jetson', age: 29}
 *      . ]
 *      > _keyValue(function(p) { return p.first + ' ' + p.last; }, people)
 *      [ { key: 'Fred Flintstone',
 *      .   val: {first: 'Fred', last: 'Flintstone', age: 23} },
 *      . { key: 'Betty Rubble',
 *      .   val: {first: 'Betty', last: 'Rubble', age: 21} },
 *      . { key: 'George Jetson',
 *      .   val: {first: 'George', last: 'Jetson', age: 29} } ]
 */
module.exports = function _keyValue(fn, list) {
    return _map(function(item) {return {key: fn(item), val: item};}, list);
};
