var _curry2 = require('./internal/_curry2');
var _pickBy = require('./internal/_pickBy');


/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop the name of the property to dissociate
 * @param {Object} obj the object to clone
 * @return {Object} a new object similar to the original but without the specified property
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */
module.exports = _curry2(function dissoc(prop, obj) {
    return _pickBy(function(val, key) { return key !== prop; }, obj);
});
