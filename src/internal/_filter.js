module.exports = function _filter(fn, list) {
  var idx = 0, result = [];
  while (idx < list.length) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
};
