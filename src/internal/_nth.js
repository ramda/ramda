module.exports = function _nth(n, list) {
  return n < 0 ? list[list.length + n] : list[n];
};
