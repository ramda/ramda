module.exports = function _quote(s) {
  return '"' + s.replace(/"/g, '\\"') + '"';
};
