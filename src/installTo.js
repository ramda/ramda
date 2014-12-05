/* global R */

var _extend = require('./internal/_extend');


/**
 * Expose the functions from ramda as properties of another object.
 * If the provided object is the global object then the ramda
 * functions become global functions.
 * Warning: This function *will* mutate the object provided.
 *
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
module.exports = function(obj) {
    return _extend(obj, R);
};
