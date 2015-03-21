module.exports = function _dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    if (p !== prop) {
      result[p] = obj[p];
    }
  }
  return result;
};
