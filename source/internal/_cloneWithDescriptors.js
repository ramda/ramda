

/**
 * Performs a shallow clone of an object while preserving property descriptors.
 *
 * @private
 * @param {Object} obj The object to clone
 * @return {Object} The cloned object
 */
export default function _cloneWithDescriptors(obj) {
  var result = {};
  var desc;
  for (var p in obj) {
    desc = Object.getOwnPropertyDescriptor(obj, p);
    if (desc === undefined) {
      result[p] = obj[p];
    } else {
      Object.defineProperty(result, p, desc);
    }
  }
  return result;
}
