var _curry2 = require('./internal/_curry2');


/**
 * Returns whether or not an object or its prototype chain has
 * a property with the specified name
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      > var Rectangle = (function() {
 *      .     var Rectangle = function(width, height) {
 *      .         this.width = width;
 *      .         this.height = height;
 *      .     };
 *      .     Rectangle.prototype.area = function() {
 *      .         return this.width * this.height;
 *      .     };
 *      .     return Rectangle;
 *      . }())
 *      > var square = new Rectangle(2, 2)
 *      > R.hasIn('width', square)
 *      true
 *      > R.hasIn('area', square)
 *      true
 */
module.exports = _curry2(function(prop, obj) {
    return prop in obj;
});
