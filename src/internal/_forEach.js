module.exports = function _forEach(fn, list) {
  var idx = 0, len = list.length;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  // i can't bear not to return *something*
  return list;
};
