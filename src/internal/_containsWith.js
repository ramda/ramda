module.exports = function _containsWith(pred, x, list) {
  var idx = 0, len = list.length;
  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
};
