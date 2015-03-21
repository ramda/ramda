var _assoc = require('./_assoc');
var _slice = require('./_slice');


module.exports = function _assocPath(path, val, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return _assoc(path[0], val, obj);
    default:
      return _assoc(path[0], _assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
  }
};
