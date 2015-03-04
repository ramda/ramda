/* global R */

var _curry1 = require('./internal/_curry1');
var _extend = require('./internal/_extend');


/**
 * Expose the functions from ramda as properties of another object.
 * If the provided object is the global object then the ramda
 * functions become global functions.
 * Warning: This function *will* mutate the object provided.
 *
 * @deprecated since v0.11.0
 * @func
 * @memberOf R
 * @category Object
 * @sig -> {*} -> {*}
 * @param {Object} obj The object to attach ramda functions
 * @return {Object} a reference to the mutated object.
 * @example
 *
 *      var x = {}
 *      R.installTo(x); // x now contains ramda functions
 *      R.installTo(this); // add ramda functions to `this` object
 */
module.exports = _curry1(function(obj) {
    return _extend(obj, R);
});
