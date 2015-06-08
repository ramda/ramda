module.exports = function _map(fn, list) {
  var idx = 0, result = [];
  while (idx < list.length) {
    result[idx] = fn(list[idx]);
    idx += 1;
  }
  return result;
};
