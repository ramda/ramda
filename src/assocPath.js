var _curry2 = require('./internal/_curry2');
var _noArgsException = require('./internal/_noArgsException');
var _slice = require('./internal/_slice');
var assoc = require('./assoc');
var is = require('./is');
var split = require('./split');


/**
 * Makes a shallow clone of an object, setting or overriding the nodes
 * required to create the given path, and placing the specifiec value at the
 * tail end of that path.  Note that this copies and flattens prototype
 * properties onto the new object as well.  All non-primitive properties
 * are copied by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} path the dot-delimited path to set
 * @param {*} val the new value
 * @param {Object} obj the object to clone
 * @return {Object} a new object similar to the original except along the specified path.
 * @example
 *
 *      var obj1 = {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: 5, j: {k: 6, l: 7}}}, m: 8};
 *      var obj2 = R.assocPath('f.g.i', {x: 42}, obj1);
 *      //=> {a: {b: 1, c: 2, d: {e: 3}}, f: {g: {h: 4, i: {x: 42}, j: {k: 6, l: 7}}}, m: 8}
 */
module.exports = (function() {
    var setParts = function(parts, val, obj) {
        if (parts.length === 1) {return assoc(parts[0], val, obj);}
        var current = obj[parts[0]];
        return assoc(parts[0], setParts(_slice(parts, 1), val, is(Object, current) ? current : {}), obj);
    };
    return function(path, val, obj) {
        var length = arguments.length;
        if (length === 0) {
            throw _noArgsException();
        }
        var parts = split('.', path);
        var fn = _curry2(function(val, obj) {
            return setParts(parts, val, obj);
        });
        switch (length) {
            case 1: return fn;
            case 2: return fn(val);
            default: return fn(val, obj);
        }
    };
}());
