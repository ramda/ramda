var _curry2 = require('./internal/_curry2');
var _extend = require('./internal/_extend');
var mapObjIndexed = require('./mapObjIndexed');

/**
 * Creates a new object by evolving a shallow copy of `object`, according to the
 * `transformation` functions.  All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      R.evolve({ elapsed: R.add(1), remaining: R.add(-1) }, { name: 'Tomato', elapsed: 100, remaining: 1400 }); //=> { name: 'Tomato', elapsed: 101, remaining: 1399 }
 */
module.exports = _curry2(function evolve(transformations, object) {
    return _extend(_extend({}, object), mapObjIndexed(function(fn, key) {
        return fn(object[key]);
    }, transformations));
});
