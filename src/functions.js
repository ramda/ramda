var _functionsWith = require('./internal/_functionsWith');
var keys = require('./keys');


/**
 * Returns a list of function names of object's own functions
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {*} -> [String]
 * @param {Object} obj The objects with functions in it
 * @return {Array} A list of the object's own properties that map to functions.
 * @example
 *
 *      > (function() {
 *      .     var F = function() {
 *      .         this.x = function() {};
 *      .         this.y = 1;
 *      .     };
 *      .     F.prototype.z = function() {};
 *      .     F.prototype.a = 100;
 *      .     return R.functions(new F());
 *      . }())
 *      ['x']
 */
module.exports = _functionsWith(keys);
