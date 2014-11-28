var _functionsWith = require('./_functionsWith');
var keysIn = require('./keysIn');


/**
 * Returns a list of function names of object's own and prototype functions
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {*} -> [String]
 * @param {Object} obj The objects with functions in it
 * @return {Array} A list of the object's own properties and prototype
 *         properties that map to functions.
 * @example
 *
 *      R.functionsIn(R); // returns list of ramda's own and prototype function names
 *
 *      var F = function() { this.x = function(){}; this.y = 1; }
 *      F.prototype.z = function() {};
 *      F.prototype.a = 100;
 *      R.functionsIn(new F()); //=> ["x", "z"]
 */
module.exports = _functionsWith(keysIn);
