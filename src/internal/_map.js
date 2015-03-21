module.exports = function _map(fn, list) {
  var idx = -1, len = list.length, result = [];
  while (++idx < len) {
    result[idx] = fn(list[idx]);
  }
  return result;
};
