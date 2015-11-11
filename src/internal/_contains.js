var _indexOf = require('./_indexOf');


/* globals Set */
module.exports = typeof Set === 'undefined' ?
  function _contains(a, list) {
    return _indexOf(list, a, 0) >= 0;
  } :
  function _containsSet(a, list) {
    var idx, inf, item;
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          idx = 0;
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return true;
            }
            idx += 1;
          }
          return false;
        }
        // non-zero numbers can utilise Set
        return new Set(list).has(a);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return new Set(list).has(a);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return new Set(list).has(a);
        }
        // other objects need R.equals for equality
        return _indexOf(list, a, 0) >= 0;

      default:
        // anything else not covered above, defer to R.equals
        return _indexOf(list, a, 0) >= 0;
    }
  };
