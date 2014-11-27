/**
 * Internal implementation of `pickAll`
 *
 * @private
 * @see R.pickAll
 */
// TODO: document, even for internals...
function _pickAll(names, obj) {
    var copy = {};
    forEach(function(name) {
        copy[name] = obj[name];
    }, names);
    return copy;
}
