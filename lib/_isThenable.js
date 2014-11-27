/**
 * Tests if a value is a thenable (promise).
 */
function _isThenable(value) {
    return (value != null) && (value === Object(value)) && typeof value.then === 'function';
}
