var _eq = require('./_eq');


module.exports = function _assoc(prop, val, obj) {
  if (_eq(obj[prop], val)) {
    return obj;
  }
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
};
