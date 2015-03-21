var _isArray = require('./_isArray');


/**
 * Private function that determines whether or not a provided object has a given method.
 * Does not ignore methods stored on the object's prototype chain. Used for dynamically
 * dispatching Ramda methods to non-Array objects.
 *
 * @private
 * @param {String} methodName The name of the method to check for.
 * @param {Object} obj The object to test.
 * @return {Boolean} `true` has a given method, `false` otherwise.
 * @example
 *
 *      var person = { name: 'John' };
 *      person.shout = function() { alert(this.name); };
 *
 *      _hasMethod('shout', person); //=> true
 *      _hasMethod('foo', person); //=> false
 */
module.exports = function _hasMethod(methodName, obj) {
  return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
};
