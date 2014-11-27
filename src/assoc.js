var _curry3 = require('./internal/_curry3');
var _extend = require('./internal/_extend');
var _map = require('./internal/_map');
var createMapEntry = require('./createMapEntry');
var fromPairs = require('./fromPairs');
var keysIn = require('./keysIn');


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value.  Note that this copies and flattens
 * prototype properties onto the new object as well.  All non-primitive
 * properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop the property name to set
 * @param {*} val the new value
 * @param {Object} obj the object to clone
 * @return {Object} a new object similar to the original except for the specified property.
 * @example
 *
 *      var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
 *      var obj2 = R.assoc('e', {x: 42}, obj1);
 *      //=>  {a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5}
 *
 *      // And moreover, obj2.b is a reference to obj1.b
 *      // No unnecessary objects are created.
 */
module.exports = _curry3(function(prop, val, obj) {
    // rather than `clone` to get prototype props too, even though they're flattened
    return _extend(fromPairs(_map(function(key) {
        return [key, obj[key]];
    }, keysIn(obj))), createMapEntry(prop, val));
});
