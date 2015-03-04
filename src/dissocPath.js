var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');
var assoc = require('./assoc');
var dissoc = require('./dissoc');
var is = require('./is');
var split = require('./split');


/**
 * Makes a shallow clone of an object, omitting the property at the
 * given path. Note that this copies and flattens prototype properties
 * onto the new object as well.  All non-primitive properties are copied
 * by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} path the dot-delimited path to set
 * @param {Object} obj the object to clone
 * @return {Object} a new object without the property at path
 * @example
 *
 *      var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4};
 *      var obj2 = R.dissocPath('b.c', obj1);
 *      //=> {a: 1, b: {d: 3}, e: 4}
 */
module.exports = (function() {
    function dissocPath(parts, obj) {
        if (parts.length === 1) {return dissoc(parts[0], obj);}
        var current = obj[parts[0]];
        return is(Object, current) ? assoc(parts[0], dissocPath(_slice(parts, 1), current), obj) : obj;
    }
    return _curry2(function(path, obj) {
        return dissocPath(split('.', path), obj);
    });
}());
