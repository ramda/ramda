module.exports = function _filterIndexed(fn, list) {
  var idx = 0, len = list.length, result = [];
  while (idx < len) {
    if (fn(list[idx], idx, list)) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};
