var _assoc = require('./_assoc');
var _dissoc = require('./_dissoc');
var _slice = require('./_slice');


module.exports = function _dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return _dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = _slice(path, 1);
      return obj[head] == null ? obj : _assoc(head, _dissocPath(tail, obj[head]), obj);
  }
};
