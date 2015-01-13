/**
 * Returns a list containing the names of all the
 * properties of the supplied object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be
 * consistent across different JS platforms.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @example
 *
 *      > (function() {
 *      .     var F = function() { this.x = 'X'; };
 *      .     F.prototype.y = 'Y';
 *      .     var f = new F();
 *      .     return R.keysIn(f);
 *      . }())
 *      ['x', 'y']
 */
module.exports = function keysIn(obj) {
    var prop, ks = [];
    for (prop in obj) {
        ks[ks.length] = prop;
    }
    return ks;
};
