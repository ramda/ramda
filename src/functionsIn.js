var _curry1 = require('./internal/_curry1');
var _functionsWith = require('./internal/_functionsWith');
var keysIn = require('./keysIn');


/**
 * Returns a list of function names of object's own and prototype functions
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {*} -> [String]
 * @param {Object} obj The objects with functions in it
 * @return {Array} A list of the object's own properties and prototype
 *         properties that map to functions.
 * @deprecated since v0.18.0
 * @example
 *
 *      R.functionsIn(R); // returns list of ramda's own and prototype function names
 *
 *      var F = function() { this.x = function(){}; this.y = 1; }
 *      F.prototype.z = function() {};
 *      F.prototype.a = 100;
 *      R.functionsIn(new F()); //=> ["x", "z"]
 */
module.exports = _curry1(_functionsWith(keysIn));
