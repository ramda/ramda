/**
 * Internal helper function for making a partial copy of an object
 *
 * @private
 *
 */
// TODO: document, even for internals...
function _pickBy(test, obj) {
    var copy = {};
    var prop;
    var props = keysIn(obj);
    var len = props.length;
    var idx = -1;
    while (++idx < len) {
        prop = props[idx];
        if (test(obj[prop], prop, obj)) {
            copy[prop] = obj[prop];
        }
    }
    return copy;
}
