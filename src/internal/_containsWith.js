module.exports = function _containsWith(pred, x, list) {
  var idx = 0;
  while (idx < list.length) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
};
