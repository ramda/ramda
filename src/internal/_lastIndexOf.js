var equals = require('../equals');


module.exports = function _lastIndexOf(list, item, from) {
  var idx = list.length;
  if (typeof from === 'number') {
    idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
  }
  while (--idx >= 0) {
    if (equals(list[idx], item)) {
      return idx;
    }
  }
  return -1;
};
