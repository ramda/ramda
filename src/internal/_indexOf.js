var equals = require('../equals');


module.exports = function _indexOf(list, item, from) {
  var idx = 0;
  if (typeof from === 'number') {
    idx = from < 0 ? Math.max(0, list.length + from) : from;
  }
  while (idx < list.length) {
    if (equals(list[idx], item)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
};
