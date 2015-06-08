module.exports = function _filterIndexed(fn, list) {
  var idx = 0, result = [];
  while (idx < list.length) {
    if (fn(list[idx], idx, list)) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};
