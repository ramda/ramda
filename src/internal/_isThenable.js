/**
 * Tests if a value is a thenable (promise).
 */
module.exports = function _isThenable(value) {
  return (value != null) && (value === Object(value)) && typeof value.then === 'function';
};
