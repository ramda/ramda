module.exports = function _forEach(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    fn(list[idx]);
    idx += 1;
  }
  // i can't bear not to return *something*
  return list;
};
