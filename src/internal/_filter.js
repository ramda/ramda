module.exports = function _filter(fn, list) {
  var idx = -1, len = list.length, result = [];
  while (++idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
  }
  return result;
};
