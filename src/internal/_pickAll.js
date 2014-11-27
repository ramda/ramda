var _forEach = require('./_forEach');


/**
 * Internal implementation of `pickAll`
 *
 * @private
 * @see R.pickAll
 */
module.exports = function _pickAll(names, obj) {
    var copy = {};
    _forEach(function(name) {
        copy[name] = obj[name];
    }, names);
    return copy;
};
