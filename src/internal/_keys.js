// TODO: Reinstate Object.keys fallback.
module.exports = function _keys(obj) {
  return Object(obj) === obj ? Object.keys(obj) : [];
};
