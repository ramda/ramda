module.exports = function _map(fn, list) {
  var idx = 0, len = list.length, result = Array(len);
  while (idx < len) {
    result[idx] = fn(list[idx]);
    idx += 1;
  }
  return result;
};
