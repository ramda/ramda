var _noArgsException = require('./internal/_noArgsException');


/**
 * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig s -> {s: a} -> a
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */
module.exports = function prop(p, obj) {
    switch (arguments.length) {
        case 0: throw _noArgsException();
        case 1: return function _prop(obj) { return obj[p]; };
    }
    return obj[p];
};
