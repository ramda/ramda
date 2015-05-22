var equals = require('../equals');


module.exports = function _indexOf(list, item, from) {
  var idx = 0, len = list.length;
  if (typeof from === 'number') {
    idx = from < 0 ? Math.max(0, len + from) : from;
  }
  while (idx < len) {
    if (equals(list[idx], item)) {
      return idx;
    }
    ++idx;
  }
  return -1;
};
