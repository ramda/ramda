var _hasMethod = require('./_hasMethod');


/**
 * Tests if a value is a thenable (promise).
 */
module.exports = function _isThenable(value) {
  return _hasMethod('then', value);
};
