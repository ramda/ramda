var equals = require('../equals');


module.exports = function _lastIndexOf(list, item, from) {
  var idx;
  if (typeof from === 'number') {
    idx = from < 0 ? list.length + from : Math.min(list.length - 1, from);
  } else {
    idx = list.length - 1;
  }
  while (idx >= 0) {
    if (equals(list[idx], item)) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
};
