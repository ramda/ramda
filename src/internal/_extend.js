var keys = require('../keys');


/**
 * Assigns own enumerable properties of the other object to the destination
 * object preferring items in other.
 *
 * @private
 * @memberOf R
 * @category Object
 * @param {Object} destination The destination object.
 * @param {Object} other The other object to merge with destination.
 * @return {Object} The destination object.
 * @example
 *
 *      _extend({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 */
module.exports = function _extend(destination, other) {
  var props = keys(other);
  var idx = -1, length = props.length;
  while (++idx < length) {
    destination[props[idx]] = other[props[idx]];
  }
  return destination;
};
